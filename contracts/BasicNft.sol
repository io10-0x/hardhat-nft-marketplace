//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity ^0.8.7;

contract BasicNft is ERC721 {
    uint256 private s_tokenCounter;
    string public constant TOKEN_URI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";
    event NftMinted(uint256 newItemId, address owner);

    constructor() ERC721("Dogie", "DOG") {
        s_tokenCounter = 0;
    }

    function mintNft() public returns (uint256) {
        uint256 newItemId = s_tokenCounter;
        _safeMint(msg.sender, newItemId);
        s_tokenCounter = s_tokenCounter + 1;
        emit NftMinted(newItemId, msg.sender);
        return newItemId;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return TOKEN_URI;
    }

    function getTokenCount() public view returns (uint256) {
        return s_tokenCounter;
    }
}
