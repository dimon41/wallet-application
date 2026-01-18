import hre from "hardhat";

async function main() {
    const contractAddress = "0xYourDeployedAddress";  // Replace with actual address
    
    // Access viem through the hre (Hardhat Runtime Environment)
    const myNFT = await hre.viem.getContractAt("MyNFT", contractAddress);
    
    // Replace with your wallet address
    const tx = await myNFT.write.mint(["0xYourWalletAddress"]); 
    
    console.log("Transaction hash:", tx);
    console.log("NFT minted!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});