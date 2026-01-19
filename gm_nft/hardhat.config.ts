
import { defineConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { polygon, polygonAmoy } from "viem/chains";
import "dotenv/config";

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
    polygonAmoy: {
      type: "http",
      url: process.env.AMOY_RPC_URL || "https://polygon-amoy.g.alchemy.com/v2/_D0YF2NfuWojfgwP3MEF5",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [""],
    },
    polygon: {
      type: "http",
      url: process.env.POLYGON_RPC_URL || "https://polygon-mainnet.g.alchemy.com/v2/_D0YF2NfuWojfgwP3MEF5",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [""],
    },
   },
});
 