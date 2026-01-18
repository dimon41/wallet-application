import "hardhat/types";  // Base Hardhat types.

declare module "hardhat/types" {
  interface HardhatRuntimeEnvironment {
    viem: {
      getWalletClients: () => Promise<any>;  // Adjust 'any' if you want stricter types.
      getPublicClient: () => Promise<any>;
      getContractAt: (name: string, address: string) => Promise<any>;
      // Add more viem methods if needed (e.g., from your scripts).
    };
  }
}