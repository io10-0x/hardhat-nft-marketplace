//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

pragma solidity ^0.8.7;

contract NftMarketplace is ReentrancyGuard {
    struct Listing {
        uint256 price;
        address seller;
    }
    mapping(address => mapping(uint256 => Listing)) private s_listing;
    mapping(address => uint256) private s_proceeds;
    error NftMarketplace__PriceMustBeAbove0();
    error NftMarketplace__Nftnotapprovedforlisting();
    error NftMarketplace__Nftalreadylisted();
    error NftMarketplace__Nftnotlisted();
    error NftMarketplace__InsufficientAmount();
    error NftMarketplace__TransferFailed();
    error NftMarketplace__notowner();
    event ItemListed(
        uint256 tokenid,
        uint256 price,
        address owner,
        address nftaddress
    );
    event ItemBought(
        uint256 tokenid,
        uint256 price,
        address indexed owner,
        address indexed previousowner,
        address nftaddress
    );
    event ItemUnlisted(address owner, address nftaddress, uint256 tokenid);
    event ItemUpdated(
        address owner,
        address nftaddress,
        uint256 tokenid,
        uint256 newprice
    );

    modifier islisted(uint256 tokenid, address nftaddress) {
        Listing memory listing = s_listing[nftaddress][tokenid];
        if (listing.price <= 0) {
            revert NftMarketplace__Nftnotlisted();
        }
        _;
    }

    modifier notlisted(uint256 tokenid, address nftaddress) {
        Listing memory listing = s_listing[nftaddress][tokenid];
        if (listing.price > 0) {
            revert NftMarketplace__Nftalreadylisted();
        }
        _;
    }

    modifier onlyOwner(uint256 tokenid, address nftaddress) {
        IERC721 nft = IERC721(nftaddress);
        if (msg.sender != nft.ownerOf(tokenid)) {
            revert NftMarketplace__notowner();
        }
        _;
    }

    function listItem(
        address nftaddress,
        uint256 tokenid,
        uint256 price
    ) external notlisted(tokenid, nftaddress) onlyOwner(tokenid, nftaddress) {
        if (price <= 0) {
            revert NftMarketplace__PriceMustBeAbove0();
        }
        IERC721 nft = IERC721(nftaddress);
        if (nft.getApproved(tokenid) != address(this)) {
            revert NftMarketplace__Nftnotapprovedforlisting();
        }
        s_listing[nftaddress][tokenid] = Listing(price, msg.sender);
        emit ItemListed(tokenid, price, msg.sender, nftaddress);
    }

    function buyItem(
        address nftaddress,
        uint256 tokenid
    ) external payable islisted(tokenid, nftaddress) nonReentrant {
        Listing memory listing = s_listing[nftaddress][tokenid];
        if (msg.value < listing.price) {
            revert NftMarketplace__InsufficientAmount();
        }
        s_proceeds[listing.seller] = s_proceeds[listing.seller] + msg.value;
        delete s_listing[nftaddress][tokenid];
        IERC721 nft = IERC721(nftaddress);
        nft.safeTransferFrom(listing.seller, msg.sender, tokenid);
        emit ItemBought(
            tokenid,
            listing.price,
            msg.sender,
            listing.seller,
            nftaddress
        );
    }

    function cancelItem(
        address nftaddress,
        uint256 tokenid
    ) external islisted(tokenid, nftaddress) onlyOwner(tokenid, nftaddress) {
        delete s_listing[nftaddress][tokenid];
        emit ItemUnlisted(msg.sender, nftaddress, tokenid);
    }

    function updateListing(
        address nftaddress,
        uint256 tokenid,
        uint256 newprice
    ) external islisted(tokenid, nftaddress) onlyOwner(tokenid, nftaddress) {
        s_listing[nftaddress][tokenid].price = newprice;
        emit ItemUpdated(msg.sender, nftaddress, tokenid, newprice);
    }

    function withdrawProceeds() external payable {
        uint256 userproceeds = s_proceeds[msg.sender];
        s_proceeds[msg.sender] = 0;
        if (userproceeds <= 0) {
            revert NftMarketplace__InsufficientAmount();
        }
        (bool success, ) = msg.sender.call{value: userproceeds}("");
        if (!success) {
            revert NftMarketplace__TransferFailed();
        }
    }

    //Getters
    function getlisting(
        address nftaddress,
        uint256 tokenid
    ) external view returns (Listing memory) {
        return s_listing[nftaddress][tokenid];
    }

    function getproceeds() external view returns (uint256) {
        return s_proceeds[msg.sender];
    }
}
