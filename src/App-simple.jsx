import React, { useState } from 'react';
import { DAppKitUI } from '@vechain/dapp-kit-ui';

// Simple working version without complex providers
function AppSimple() {
  const [account, setAccount] = useState(null);

  return (
    <div className="container">
      <header className="header">
        <h1>Learn2Earn</h1>
        <p>Complete learning tasks and earn B3TR tokens</p>
      </header>

      <div className="wallet-section">
        <DAppKitUI
          nodeUrl="https://testnet.vechain.org"
          genesis="test"
          onConnected={(address) => {
            console.log('Connected:', address);
            setAccount(address);
          }}
          onDisconnected={() => {
            console.log('Disconnected');
            setAccount(null);
          }}
        />
      </div>

      {account ? (
        <div className="card">
          <h2>Welcome!</h2>
          <p>Connected Address: {account}</p>
          <p>Contract: 0xb4e6da56300b24cec34d9a801f1eb91a21c62a3f</p>
        </div>
      ) : (
        <div className="card">
          <p style={{ textAlign: 'center', color: '#666' }}>
            Please connect your VeWorld wallet to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default AppSimple;
