const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
const { interfaces } = require("mocha");
require("@nomicfoundation/hardhat-chai-matchers");

describe("Nftmarketplace unit tests", function () {
  let deployer;
  let nftmarketplace;
  let BasicNft;
  let nftmarketplaceaddress;
  let BasicNftaddress;
  let signers;
  beforeEach(async function () {
    await deployments.fixture(["all"]);
    //deployer = (await getNamedAccounts()).deployer;
    signers = await ethers.getSigners();
    deployer = signers[0];

    nftmarketplace = await ethers.getContract("NftMarketplace", deployer);
    nftmarketplaceaddress = await nftmarketplace.getAddress();

    BasicNft = await ethers.getContract("BasicNft", deployer);
    BasicNftaddress = await BasicNft.getAddress();

    const minttx = await BasicNft.mintNft();
    const minttxreceipt = await minttx.wait();
    console.log(minttxreceipt);

    console.log("BasicNft deployed at:", BasicNftaddress);
    console.log("NftMarketplace deployed at:", nftmarketplaceaddress);
  });

  describe("listitem Test", function () {
    it("Test that an nft cannot be listed with a price of 0 ", async function () {
      await expect(
        nftmarketplace.listItem(BasicNft, 0, 0)
      ).to.be.revertedWithCustomError(
        nftmarketplace,
        "NftMarketplace__PriceMustBeAbove0"
      );
    });

    it("Test that an nft cannot be listed without the marketplace address being given approval", async function () {
      await expect(
        nftmarketplace.listItem(BasicNft, 0, ethers.parseEther("1"))
      ).to.be.revertedWithCustomError(
        nftmarketplace,
        "NftMarketplace__Nftnotapprovedforlisting"
      );
    });

    it("Test that an nft cannot be relisted", async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      await approval.wait();
      await nftmarketplace.listItem(BasicNft, 0, ethers.parseEther("1"));
      await expect(
        nftmarketplace.listItem(BasicNft, 0, 1)
      ).to.be.revertedWithCustomError(
        nftmarketplace,
        "NftMarketplace__Nftalreadylisted"
      );
    });

    it("Test that an nft cannot be listed by an account that doesnt own the nft", async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      await approval.wait();
      const account1 = signers[1];
      const connectednftmarketplace = await nftmarketplace.connect(account1);
      await expect(
        connectednftmarketplace.listItem(BasicNft, 0, ethers.parseEther("1"))
      ).to.be.revertedWithCustomError(
        nftmarketplace,
        "NftMarketplace__notowner"
      );
    });

    it("Test that an nft can be listed successfully after meeting all criteria", async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      const listtx = await nftmarketplace.listItem(
        BasicNft,
        0,
        ethers.parseEther("1")
      );
      const listingmapping = await nftmarketplace.getlisting(
        BasicNftaddress,
        0
      );
      console.log(listingmapping);
      const listingprice = await listingmapping.price;
      const listingaddress = await listingmapping.seller;
      const expectedlistingprice = ethers.parseEther("1");
      const expectedlistingaddress = await deployer.getAddress();

      assert.equal(listingprice, expectedlistingprice);
      assert.equal(listingaddress, expectedlistingaddress);
    });
  });

  describe("buyItem Test", function () {
    beforeEach(async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      const listtx = await nftmarketplace.listItem(
        BasicNft,
        0,
        ethers.parseEther("1")
      );
    });
    it("Test that an nft cannot be bought for less than its listed price", async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      await approval.wait();
      const account1 = signers[1];
      const connectednftmarketplace = await nftmarketplace.connect(account1);
      await expect(
        connectednftmarketplace.buyItem(BasicNft, 0, {
          value: ethers.parseEther("0.05"),
        })
      ).to.be.revertedWithCustomError(
        connectednftmarketplace,
        "NftMarketplace__InsufficientAmount"
      );
    });

    it("Test that the proceeds of the seller are updated successfully when their nft is bought", async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      await approval.wait();
      const account1 = signers[1];
      const connectednftmarketplace = await nftmarketplace.connect(account1);

      const buytx = await connectednftmarketplace.buyItem(BasicNft, 0, {
        value: ethers.parseEther("1"),
      });
      await buytx.wait();
      const proceeds = await nftmarketplace.getproceeds();
      const expectedproceeds = ethers.parseEther("1");
      assert.equal(proceeds, expectedproceeds);
    });

    it("Test that the proceeds of the seller are updated successfully when their nft is bought", async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      await approval.wait();
      const account1 = signers[1];
      const connectednftmarketplace = await nftmarketplace.connect(account1);

      const buytx = await connectednftmarketplace.buyItem(BasicNft, 0, {
        value: ethers.parseEther("1"),
      });
      await buytx.wait();
      const newowneraddress = await BasicNft.ownerOf(0);
      const expectedowneraddress = await account1.getAddress();
      assert.equal(newowneraddress, expectedowneraddress);
    });
  });

  describe("cancelitem Test", function () {
    beforeEach(async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      const listtx = await nftmarketplace.listItem(
        BasicNftaddress,
        0,
        ethers.parseEther("1")
      );
    });

    it("Test that when a user lists an nft, they can unlist successfully ", async function () {
      const canceltx = await nftmarketplace.cancelItem(BasicNftaddress, 0);
      await canceltx.wait();
      const isdeleted = await nftmarketplace.getlisting(BasicNftaddress, 0);
      console.log(isdeleted);
      assert.equal(isdeleted.price, 0);
    });

    it("Test that a user cannot unlist an nft that isnt listed ", async function () {
      const minttx = await BasicNft.mintNft();

      const minttxreceipt = await minttx.wait();
      console.log(minttxreceipt);
      const approval = await BasicNft.approve(nftmarketplaceaddress, 1);
      await expect(
        nftmarketplace.cancelItem(BasicNftaddress, 1)
      ).to.be.revertedWithCustomError(
        nftmarketplace,
        "NftMarketplace__Nftnotlisted"
      );
    });
  });

  describe("updatelisting Test", function () {
    beforeEach(async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      const listtx = await nftmarketplace.listItem(
        BasicNftaddress,
        0,
        ethers.parseEther("1")
      );
    });

    it("Test that when a user lists an nft, they can update the list price ", async function () {
      const updatetx = await nftmarketplace.updateListing(
        BasicNftaddress,
        0,
        ethers.parseEther("2")
      );
      await updatetx.wait();
      const updatedlisting = await nftmarketplace.getlisting(
        BasicNftaddress,
        0
      );
      console.log(updatedlisting);
      const expectedlistingprice = ethers.parseEther("2");
      const listingprice = await updatedlisting.price;
      assert.equal(expectedlistingprice, listingprice);
    });
  });

  describe("withdrawProceeds Test", function () {
    beforeEach(async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      const listtx = await nftmarketplace.listItem(
        BasicNft,
        0,
        ethers.parseEther("1")
      );
    });
    it("Test that proceeds cannot be withdrawn if a sale hasnt been made", async function () {
      await expect(
        nftmarketplace.withdrawProceeds()
      ).to.be.revertedWithCustomError(
        nftmarketplace,
        "NftMarketplace__InsufficientAmount"
      );
    });

    it("Test that the proceeds of the seller are sent successfully when a sale is made", async function () {
      const approval = await BasicNft.approve(nftmarketplaceaddress, 0);
      await approval.wait();
      const account1 = signers[1];
      const connectednftmarketplace = await nftmarketplace.connect(account1);
      const beforewithdrawbalance = await ethers.provider.getBalance(
        deployer.address
      );
      const buytx = await connectednftmarketplace.buyItem(BasicNft, 0, {
        value: ethers.parseEther("1"),
      });
      await buytx.wait();
      const withdrawtx = await nftmarketplace.withdrawProceeds();
      await withdrawtx.wait();
      const aftersaleproceeds = await nftmarketplace.getproceeds();
      const afterwithdrawbalance = await ethers.provider.getBalance(
        deployer.address
      );
      assert.equal(aftersaleproceeds, 0);
      assert(afterwithdrawbalance > beforewithdrawbalance);
    });
  });
});
