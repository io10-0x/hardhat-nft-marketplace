const { deployments, ethers } = require("hardhat");

const tokenid = 24;

async function buylisting() {
  //await deployments.fixture(["all"]);
  signers = await ethers.getSigners();
  deployer = signers[0];

  nftmarketplace = await ethers.getContract("NftMarketplace", deployer);
  nftmarketplaceaddress = await nftmarketplace.getAddress();

  BasicNft = await ethers.getContract("BasicNft", deployer);
  BasicNftaddress = await BasicNft.getAddress();
  const listing = await nftmarketplace.getlisting(BasicNftaddress, tokenid);
  console.log(
    `Buying Item with token id of ${tokenid} at ${nftmarketplaceaddress}`
  );
  const price = listing[0];
  console.log(price);
  if (price > 0) {
    const buytx = await nftmarketplace.buyItem(BasicNftaddress, tokenid, {
      value: price,
    });
    await buytx.wait();
    console.log("Item Bought");
  } else {
    console.log("Item Not Listed");
  }
}

buylisting()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
