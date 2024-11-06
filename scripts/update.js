const { deployments, ethers } = require("hardhat");

const tokenid = 24;

async function updatelisting() {
  //await deployments.fixture(["all"]);
  signers = await ethers.getSigners();
  deployer = signers[0];

  nftmarketplace = await ethers.getContract("NftMarketplace", deployer);
  nftmarketplaceaddress = await nftmarketplace.getAddress();

  BasicNft = await ethers.getContract("BasicNft", deployer);
  BasicNftaddress = await BasicNft.getAddress();

  console.log(
    `Updating Item with token if of ${tokenid} at ${nftmarketplaceaddress}`
  );
  const updatetx = await nftmarketplace.updateListing(
    BasicNftaddress,
    tokenid,
    ethers.parseEther("5")
  );
  await updatetx.wait();
  console.log("Item Updated");
}

updatelisting()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
