const { ethers } = require("hardhat");

async function decode() {
  const nftmarketplace = await ethers.getContract("NftMarketplace");
  const abiCoder = nftmarketplace.interface.parseError("0x72e6cfad");
  console.log(abiCoder);
}

decode()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
