<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/io10-0x/hardhat-nft-marketplace">
    <img src="images/logo.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">Nft Marketplace</h3>

  <p align="center">
    Nft Marketplace Smart Contract

<br />
<a href="https://github.com/io10-0x/hardhat-nft-marketplace"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://github.com/io10-0x/hardhat-nft-marketplace">View Demo</a>
·
<a href="https://github.com/io10-0x/hardhat-nft-marketplace/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
·
<a href="https://github.com/io10-0x/hardhat-nft-marketplace/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# About the Nft Marketplace

## Overview

This NFT Marketplace project covers the development of a decentralized NFT marketplace, involving the creation of smart contracts, front-end development using Vite, and the implementation of a Moralis self-hosted server for event listening and database management. The project integrates blockchain concepts with modern web development practices, featuring listings, purchases, and updates to NFTs.
<a href="https://github.com/io10-0x/frontendnft-marketplace-io10"><strong>See Front End Directory</strong></a>
<a href="https://github.com/io10-0x/self-hosted-moralisbackend-parse-server-migration"><strong>See Self Hosted Server Directory</strong></a>

## Key Features

## 1. Smart Contracts:

- **BasicNft.sol**: A straightforward ERC-721 implementation with simple minting functionality and fixed metadata.
- **NftMarketplace.sol**: Handles the listing, buying, canceling, updating, and proceeds withdrawal for NFTs.

## 2. Security:

- Implemented measures against reentrancy attacks using OpenZeppelin's ReentrancyGuard.
- Employed the pull-over-push method for secure payment transfers.

## 3. Front-End Integration:

- Developed using Vite, Wagmi, ConnectKit, and Chakra UI.
- Styled with Chakra UI components for a clean user interface.
- Implemented useReadContract and useWriteContract hooks for blockchain interactions.
- <a href=""https://github.com/io10-0x/frontendnft-marketplace-io10"><strong>See Front End Directory</strong></a>

## 4. Self-Hosted Backend Server:

- Configured a self-hosted Moralis server with MongoDB, Redis, and ngrok for real-time event listening and data storage.
- Utilized cloud functions and triggers for database operations.
- Implemented event listeners for handling ItemListed, ItemBought, and ItemUnlisted events.
- <a href="https://github.com/io10-0x/self-hosted-moralisbackend-parse-server-migration"><strong>See Self Hosted Server Directory</strong></a>

## Setup Guide

## Smart Contracts

## 1. Contracts:

- NftMarketplace.sol: Main marketplace logic.
- BasicNft.sol: Basic NFT implementation.

## 2. Deployment:

- Used Hardhat for contract development and deployment.
- Configured deployment scripts to update front-end constants programmatically.

## Front-End Development

## 1. Initial Setup:

- Created a new Next.js project and integrated Wagmi and ConnectKit for wallet connections.
- Implemented Chakra UI for styling and UI components.

## 2. Functionality:

- Displayed all NFTs listed for sale.
- Created components like NFTBox for NFT display with options to buy or update listings.
- Integrated wallet connection buttons using ConnectKit.

## Moralis Self-Hosted Server

## 1. Configuration:

- Set up MongoDB for data storage, Redis for rate-limiting, and ngrok for tunneling.
- Followed Moralis v1 docs to create a self-hosted server for local development.

## 2. Cloud Functions and Triggers:

- Defined a custom watchContractEvent cloud function to listen for blockchain events.
- Implemented triggers to create or delete records in the Recentlylistedtable based on marketplace events.

## 3. Challenges and Solutions:

- Debugged ngrok issues and configured a static URL for stability.
- Used ethers to set up a connection between the local blockchain and the Moralis server.
- Overcame deprecation of the watchContractEvent method by creating a custom implementation in the Moralis server.

## Front-End Components

## 1. NFTBox Component:

Extracts the tokenURI from the contract using useReadContract.
Displays the NFT image and details.

## 2. UpdateListing Component:

Allows NFT owners to update the price of their listed NFT.
Utilizes useWriteContract for calling the updateListing function on-chain.

## 3. BuyListing Component:

- Enables users to buy NFTs they do not own.
- Integrated transaction handling with useWriteContract.

## Data Querying

- Used useMoralisQuery to fetch data from Recentlylistedtable in the database and display NFTs on the front end.
- Configured event triggers to manage real-time updates in the database.

## User Experience

- Hover Card from Chakra UI: Implemented for displaying actions (update or buy) when hovering over an NFT.
- Conditional Rendering: Showed different options based on whether the connected wallet is the owner of the NFT.

## Running the Project

## 1. Smart Contracts:

- Run Hardhat node: yarn hardhat node.
- Deploy contracts: yarn hardhat run ./scripts/deploy.js --network localhost.

## 2. Front-End:

- Start Next.js development server: npm run dev.

## 3. Moralis Server:

- Start the self-hosted server: npm run start in the parse-server-migration directory.
- Run event listeners: node addevents.js.

## 4. Environment Variables:

- Ensure .env file has configurations for RPC URLs, project IDs, and Moralis server details.

## Future Improvements

- Integrate Moralis Streams API for mainnet and testnet stability.
- Enhance UI/UX with additional features like sorting and filtering NFTs.
- Implement additional smart contract functionality for user interaction enhancements.

## Conclusion

This project showcases a full-stack decentralized NFT marketplace with blockchain, front-end, and backend integration. It provides valuable insights into smart contract development, event handling, database management, and building user interfaces with modern web tools.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## WebPage Preview

Sample of what pages should look like after deployment

![Nft Marketplace Front End Screenshot][FrontEnd-Image]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/io10-0x/hardhat-nft-marketplace/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/io10-0x/hardhat-nft-marketplace/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=io10-0x/hardhat-nft-marketplace" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

[![LinkedIn][linkedin-shield]][linkedin-url]

Project Link: [https://github.com/io10-0x/hardhat-fund-me-fcc-backend-deployment](https://github.com/io10-0x/hardhat-fund-me-fcc-backend-deployment)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Smart Contract Kit Github](https://github.com/smartcontractkit/full-blockchain-solidity-course-js)
- [Full Blockchain and Solidity Course YT](https://www.youtube.com/watch?v=gyMwXuJrbJQ)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/io10-0x/hardhat-fund-me-fcc-backend-deployment.svg?style=for-the-badge
[contributors-url]: https://github.com/io10-0x/hardhat-fund-me-fcc-backend-deployment/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/io10-0x/hardhat-fund-me-fcc-backend-deployment.svg?style=for-the-badge
[forks-url]: https://github.com/io10-0x/hardhat-fund-me-fcc-backend-deployment/network/members
[stars-shield]: https://img.shields.io/github/stars/io10-0x/hardhat-fund-me-fcc-backend-deployment.svg?style=for-the-badge
[stars-url]: https://github.com/io10-0x/hardhat-fund-me-fcc-backend-deployment/stargazers
[issues-shield]: https://img.shields.io/github/issues/io10-0x/hardhat-fund-me-fcc-backend-deployment.svg?style=for-the-badge
[issues-url]: https://github.com/io10-0x/hardhat-fund-me-fcc-backend-deployment/issues
[license-shield]: https://img.shields.io/github/license/io10-0x/hardhat-fund-me-fcc-backend-deployment.svg?style=for-the-badge
[license-url]: https://github.com/io10-0x/hardhat-fund-me-fcc-backend-deployment/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ivan-otono-87a921261
[OpenZeppelin.js]: https://img.shields.io/badge/openzeppelin-4E5EE4?style=for-the-badge&logo=openzeppelin&logoColor=black
[OpenZeppelin-url]: https://www.openzeppelin.com/
[Chainlink.js]: https://img.shields.io/badge/chainlink-375BD2?style=for-the-badge&logo=chainlink&logoColor=black
[Chainlink-url]: https://chain.link/
[Ethers.js]: https://img.shields.io/badge/ethers-2535A0?style=for-the-badge&logo=ethers&logoColor=black
[Ethers-url]: https://docs.ethers.org/v5/
[FrontEnd-Image]: /images/NftMarketplace.png
