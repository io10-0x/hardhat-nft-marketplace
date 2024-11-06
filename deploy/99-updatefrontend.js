const { ethers, network } = require("hardhat");
const fs = require("fs");

const networkmappingsfile =
  "/home/io10-0x/hardhatjavascript/nextjs-nft-marketplace-io10/nft-marketplace-io10/src/constants/networkMappings.json";

const frontendabilocation =
  "/home/io10-0x/hardhatjavascript/nextjs-nft-marketplace-io10/nft-marketplace-io10/src/constants/";

async function updateabi() {
  const nftmarketplace = await ethers.getContract("NftMarketplace");
  const basicnft = await ethers.getContract("BasicNft");
  const contractaddress = await nftmarketplace.getAddress();

  fs.writeFileSync(
    `${frontendabilocation}NftMarketplaceabi.json`,
    nftmarketplace.interface.formatJson()
  );

  fs.writeFileSync(
    `${frontendabilocation}BasicNftabi.json`,
    basicnft.interface.formatJson()
  );

  fs.writeFileSync(
    `${frontendabilocation}Nftmarketplaceaddress.json`,
    JSON.stringify(contractaddress)
  );
}

async function updatefrontend() {
  const nftmarketplace = await ethers.getContract("NftMarketplace");
  const contractaddress = await nftmarketplace.getAddress();
  console.log(contractaddress);
  const chainId = network.config.chainId.toString();
  const networkmappingsfileread = JSON.parse(
    fs.readFileSync(networkmappingsfile, "utf8")
  );
  if (chainId in networkmappingsfileread) {
    if (
      !networkmappingsfileread[chainId]["Nftmarketplace"].includes(
        contractaddress
      )
    ) {
      networkmappingsfileread[chainId]["Nftmarketplace"].push(contractaddress);
    }
  } else {
    networkmappingsfileread[chainId] = { Nftmarketplace: [contractaddress] };
  }
  fs.writeFileSync(
    networkmappingsfile,
    JSON.stringify(networkmappingsfileread)
  );
  console.log("Mappings updated");
}

module.exports = async () => {
  await updatefrontend();
  await updateabi();
};

module.exports.tags = ["all", "updatefrontend"];
