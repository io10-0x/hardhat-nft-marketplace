const { deployments, ethers } = require("hardhat");

async function mintandlist() {
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
  let tokenid; // Variable to store the requestId

  // Iterate over the logs to find the 'RequestSent' event
  for (let log of eventLogs) {
    if (log.fragment && log.fragment.name === "NftMinted") {
      tokenid = log.args[0]; // Store the requestId
      break; // Stop the loop once the requestId is found
    }
  }

  console.log("BasicNft deployed at:", BasicNftaddress);
  console.log("NftMarketplace deployed at:", nftmarketplaceaddress);
  const approval = await BasicNft.approve(nftmarketplaceaddress, tokenid);
  await approval.wait();
  const listtx = await nftmarketplace.listItem(
    BasicNft,
    tokenid,
    ethers.parseEther("1")
  );
  console.log(
    `Nft Listing Details at ${await nftmarketplace.getlisting(
      BasicNftaddress,
      tokenid
    )}`
  );
}

mintandlist()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
