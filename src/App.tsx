import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';

function App() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  
  const nftAddress = '0x5f12a8c51615d7c862e0f403721e62d086269a80';  // From deploy logs (Polygon mainnet).
  const nftAbi = parseAbi(['function mint(address to) public']);  // Your mint ABI.
  
  
  const handleMint = () => {
    if (!isConnected || !address) return;

    writeContract({
      address: nftAddress,
      abi: nftAbi,
      functionName: 'mint',
      args: [address],
    }, {
      onSuccess: (hash) => console.log('Mint Tx:', hash),
      onError: (error) => console.error('Error:', error),
    });
  };
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>My NFT DApp</h1>
      <ConnectButton />
      {isConnected && <button onClick={handleMint} style={{ marginTop: '20px' }}>Mint NFT</button>}
      {/* Optional NFT display */}
      <h2>Your NFT</h2>
      <img src="https://ipfs.io/ipfs/your-metadata-cid/image.png" alt="NFT" width="300" />
    </div>
  );
}

export default App;