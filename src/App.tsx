import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello Web3 World!</h1>
      <p>Connect your wallet below:</p>
      <ConnectButton />
    </div>
  );
}

export default App;