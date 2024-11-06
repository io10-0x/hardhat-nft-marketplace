const { deployments, ethers } = require("hardhat");

async function mint() {
  //await deployments.fixture(["all"]);
  signers = await ethers.getSigners();
  deployer = signers[0];

  nftmarketplace = await ethers.getContract("NftMarketplace", deployer);
  nftmarketplaceaddress = await nftmarketplace.getAddress();

  BasicNft = await ethers.getContract("BasicNft", deployer);
  BasicNftaddress = await BasicNft.getAddress();

  const minttx = await BasicNft.mintNft();
  const minttxreceipt = await minttx.wait();
  const eventLogs = minttxreceipt.logs;
  console.log(eventLogs);
  console.log(BasicNftaddress);
}

mint()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
