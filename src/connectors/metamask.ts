import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'

export const [metamask, hooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

export const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames 
} = hooks;
