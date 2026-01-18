import hre from "hardhat";
import { createPublicClient, createWalletClient, http, getContract } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

async function main() {
    const contractAddress = "0x1874da065754cda21e17dd59a0c1b04ec3242144";  // Replace with actual address
    
    // Create clients directly with viem
    const rpcUrl = process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/9cfdb8835d3542caaacb6f2f20b229a4";
    
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(rpcUrl),
    });

    const privateKey = process.env.PRIVATE_KEY || "4d3f314e5f34f1f57eb91f6547b7dc8591d1a7673ee90e4477523e203f5b1d6f";
    
    // Create account from private key
    const account = privateKeyToAccount(
        privateKey.startsWith("0x") ? (privateKey as `0x${string}`) : (`0x${privateKey}` as `0x${string}`)
    );

    const walletClient = createWalletClient({
        chain: sepolia,
        transport: http(rpcUrl),
        account,
    });

    // Get the artifact for ABI
    const artifact = await hre.artifacts.readArtifact("MyNFT");

    // Create contract instance
    // const myNFT = getContract({
    //     address: contractAddress as `0x${string}`,
    //     abi: artifact.abi,
    //     client: { public: publicClient, wallet: walletClient },
    // });

    // Replace with your wallet address - MetaMask Account 2 Sepolia
    const tx = await walletClient.writeContract({
        address: contractAddress as `0x${string}`,
        abi: artifact.abi,
        functionName: "mint",
        args: ["0xD4cB0D54E5aD04A0ea73c6EEFB53D14Dfa2d6541"],
        account,
    });

    console.log("Transaction hash:", tx);
    console.log("NFT minted!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});