import React from 'react';
import ReactDOM from 'react-dom/client';

import { hooks as metaMaskHooks, metamask } from './connectors/metamask';
import { MetaMask } from '@web3-react/metamask';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';

import App from './App';
import './index.css';

const connectors: [MetaMask, Web3ReactHooks][] = [
  [metamask, metaMaskHooks],
];

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);
