# Buy Me a Coffee - Web3 Learning Project

A web3 frontend application built with **TypeScript** and **Vite** that demonstrates how to interact with Ethereum smart contracts using [viem](https://viem.sh/).

## ⚠️ Educational Purpose Only

**This is a learning project. DO NOT use with real funds or on mainnet.**

Use a local blockchain (like Anvil/Hardhat) or a testnet with test ETH only.

## Features

- 🔌 Connect to MetaMask wallet
- 💰 Send ETH to a smart contract (fund function)
- 📊 Check contract balance
- 💸 Withdraw funds from contract (owner only)

## Tech Stack

- **Build Tool**: Vite
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Web3 Library**: [viem](https://viem.sh/) v2.8.0
- **Wallet**: MetaMask browser extension
- **Smart Contract**: Solidity contract (address and ABI in `constants-js.js`)

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- [MetaMask](https://metamask.io/) browser extension installed
- A local blockchain running (e.g., Anvil, Hardhat, Ganache) OR a testnet
- Basic understanding of Ethereum and smart contracts

## Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd html-ts-coffee
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Update contract details**

   Edit `constants-js.js` with your deployed contract address and ABI:

   ```javascript
   export const contractAddress = "0x..."; // Your contract address
   export const coffeeAbi = [...]; // Your contract ABI
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Configure MetaMask**

   - Add your local blockchain network (usually `http://127.0.0.1:8545`)
   - Import an account with test ETH
   - DO NOT use accounts with real funds

6. **Open in browser**

   Navigate to the URL shown in terminal (usually `http://localhost:5173`)

## Usage

1. Click **Connect** to connect your MetaMask wallet
2. Enter an ETH amount and click **Fund** to send test ETH to the contract
3. Click **Get Balance** to view the contract's current balance
4. Click **Withdraw** to withdraw funds (only works if you're the contract owner)

## Scripts

```bash
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm preview     # Preview production build
```

## Learning Objectives

This project helps you understand:

- How to set up a modern web3 frontend with Vite and TypeScript
- How to connect to MetaMask using viem
- How to read from and write to smart contracts
- How to handle wallet connections in a web application
- Basic error handling for blockchain transactions
- Using ES modules with external libraries
- Working with chain-specific configurations

## Common Issues

### "custom is not defined"

Make sure `custom` is imported from viem in `index.js`:

```javascript
import { createWalletClient, custom } from "viem";
```

### "Please install MetaMask"

Install the MetaMask browser extension and refresh the page.

### Transaction fails

- Ensure you're connected to the correct network
- Check you have enough test ETH for gas fees
- Verify the contract address is correct
- Check your local blockchain is running (e.g., `anvil`)

### Vite server won't start

- Run `pnpm install` to ensure all dependencies are installed
- Check that port 5173 isn't already in use

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [Viem Documentation](https://viem.sh/)
- [MetaMask Developer Docs](https://docs.metamask.io/)
- [Ethereum Development Documentation](https://ethereum.org/en/developers/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [pnpm Documentation](https://pnpm.io/)

## License

This is an educational project. Feel free to use and modify for learning purposes.

## Disclaimer

**This code is for educational purposes only. It has not been audited and should never be used with real funds or deployed to mainnet.**
