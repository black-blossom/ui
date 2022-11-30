/// <reference types="vite/client" />
import { ExternalProvider } from 'ethers';

declare global {
  interface Window {
    ethereum?: ExternalProvidera;
  }
}
