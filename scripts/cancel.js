const { deployments, ethers } = require("hardhat");

const tokenid = 26;

async function cancellisting() {
  //await deployments.fixture(["all"]);
  signers = await ethers.getSigners();
  deployer = signers[0];

  nftmarketplace = await ethers.getContract("NftMarketplace", deployer);
  nftmarketplaceaddress = await nftmarketplace.getAddress();

  BasicNft = await ethers.getContract("BasicNft", deployer);
  BasicNftaddress = await BasicNft.getAddress();

  console.log(
    `Cancelling Item with token if of ${tokenid} at ${nftmarketplaceaddress}`
  );
  const canceltx = await nftmarketplace.cancelItem(BasicNftaddress, tokenid);
  await canceltx.wait();
  console.log("Item Cancelled");
}

cancellisting()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
