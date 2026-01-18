
import "@nomicfoundation/hardhat-viem";
import { configVariable, defineConfig } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.28",  // Matches pragma.
};
export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
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
      chainType: "l1",
      url: configVariable("https://sepolia.infura.io/v3/9cfdb8835d3542caaacb6f2f20b229a4"),
      accounts: [configVariable("S4d3f314e5f34f1f57eb91f6547b7dc8591d1a7673ee90e4477523e203f5b1d6f")],
    },
  },
});
