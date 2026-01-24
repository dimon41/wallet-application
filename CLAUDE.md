# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web3 DApp for NFT minting on Polygon blockchain. Combines a React frontend with Hardhat smart contract development.

## Commands

### Frontend (root level)
```bash
npm run dev        # Start Vite dev server
npm run build      # TypeScript compile + Vite bundle
npm run lint       # ESLint on .ts/.tsx files
npm run preview    # Preview production build
```

### Smart Contracts (gm_nft/)
```bash
cd gm_nft
npx hardhat test                                          # Run all tests
npx hardhat test solidity                                 # Solidity tests only
npx hardhat test nodejs                                   # Node.js tests only
npx hardhat ignition deploy ignition/modules/Counter.ts   # Deploy locally
npx hardhat scripts/deploy.ts --network polygon           # Deploy to Polygon
npx hardhat scripts/mint.ts --network polygon             # Mint NFTs
```

## Architecture

### Frontend Stack
- **React 19** with TypeScript and Vite
- **Wagmi** for Web3 hooks (`useAccount`, `useWriteContract`)
- **RainbowKit** for wallet connection UI
- **Viem** as Ethereum client library
- **React Query** for async state management

### Smart Contract Stack
- **Hardhat 3** with Solidity 0.8.28
- **OpenZeppelin** ERC721 implementation
- **Hardhat Ignition** for deployments

### Application Flow
```
main.tsx (Wagmi/RainbowKit providers) → App.tsx (NFT minting UI)
    ↓
Wagmi hooks → Contract interaction → Polygon network
```

### Key Contract: MyNFT (gm_nft/contracts/MyNFT.sol)
- ERC721 + Ownable pattern
- `mint(address to)` - Owner-only minting
- Deployed at: `0x3A17DD2d21fa53276f5023C59E53B01feD5e2920` (Polygon Mainnet)

## Environment Variables

Required in `gm_nft/`:
- `POLYGON_RPC_URL` - Polygon mainnet RPC
- `AMOY_RPC_URL` - Polygon testnet RPC
- `PRIVATE_KEY` - Account for deployments/minting

Frontend uses hardcoded WalletConnect project ID as fallback.

## Network Configuration

Primary: Polygon Mainnet
Testnet: Polygon Amoy
Also configured: Ethereum Mainnet/Sepolia, OP Mainnet
