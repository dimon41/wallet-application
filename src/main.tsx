import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, sepolia, polygon } from 'wagmi/chains'; // Add chains you want (e.g., Ethereum mainnet/testnet)


// Create Wagmi config
const config = getDefaultConfig({
  appName: 'My Wallet DApp',
  //projectId: import.meta.env.VITE_PROJECT_ID, // Your Reown ID
  projectId: "0c903133ce492ad65f36f879f3e8c3b2",
  chains: [mainnet, sepolia, polygon], // Networks to support
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);