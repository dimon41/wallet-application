
import { defineConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

export default defineConfig({
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/9cfdb8835d3542caaacb6f2f20b229a4",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : ["4d3f314e5f34f1f57eb91f6547b7dc8591d1a7673ee90e4477523e203f5b1d6f"],
    },
  },
});
