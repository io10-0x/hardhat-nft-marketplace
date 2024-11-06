const { network, ethers } = require("hardhat");
require("dotenv").config();
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log(`deploying to network with ${chainId}`);
  const nftmarketplace = await deploy("NftMarketplace", {
    from: deployer,
    args: [],
    log: true,
    //waitConfirmations: 4,
  });

  log("-----------------------------------------");

  if (!(chainId == 1337) && process.env.ETHERSCAN_TOKEN) {
    await verify(nftmarketplace.address, []);
  }
  log(`Verified contract at ${nftmarketplace.address}`);
};

module.exports.tags = ["all", "nftmarketplace"];
