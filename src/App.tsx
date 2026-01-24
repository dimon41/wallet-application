import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';

function App() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  const nftAddress = '0x3A17DD2d21fa53276f5023C59E53B01feD5e2920';
  const nftAbi = parseAbi(['function mint(address to) public']);

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
    <div className="app-container">
      <header className="header">
        <h1 className="logo-title">MyNFT</h1>
        <ConnectButton />
      </header>

      <main className="main-content">
        {!isConnected ? (
          <div className="welcome-card">
            <h2 className="welcome-title">Welcome to MyNFT</h2>
            <p className="welcome-subtitle">Connect your wallet to mint exclusive NFTs</p>
            <div className="connect-wrapper">
              <ConnectButton />
            </div>
          </div>
        ) : (
          <div className="nft-card">
            <p className="nft-label">Your NFT</p>
            <div className="nft-image-wrapper">
              <img
                className="nft-image"
                src="https://ipfs.io/ipfs/bafybeid3oli4jtyqvp4s3toerhekjp4fby5nhifqlhfpvhrr6cjv4d3ynm"
                alt="NFT"
              />
            </div>
            <button className="mint-button" onClick={handleMint}>
              Mint NFT
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Powered by Polygon</p>
      </footer>
    </div>
  );
}

export default App;
