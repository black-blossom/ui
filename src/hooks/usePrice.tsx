import create from 'zustand';

import getPrice from '../utils/getPrice';
import { PAIRSLIST } from '../utils/pairs';

interface PriceStore {
  prices: Map<string, number>
  updatePrices: number

  subscribe: (chainId: number) => void
  fetchPrices: (chainId: number) => Promise<void>
};

const usePriceStore = create<PriceStore>((set, get) => ({
  prices: new Map<string, number>(),
  updatePrices: 0,

  subscribe: (chainId) => {
    if(get().updatePrices !== 0) clearInterval(get().updatePrices);

    get().fetchPrices(chainId);
    const updatePrices = window.setInterval(() => get().fetchPrices(chainId), 5000);

    set({
      updatePrices: updatePrices
    });
  },

  fetchPrices: async (chainId) => {
    const pairList = PAIRSLIST[chainId];

    const pricePromises: Promise<number>[] = [];
    pairList.forEach((pair) => {
      pricePromises.push(getPrice(pair, chainId));
    });

    const prices = await Promise.all(pricePromises);

    const priceMap = new Map<string, number>();
    pairList.forEach((pair, index) => {
      priceMap.set(pair, prices[index]);
    });
    priceMap.set('USD/USD', 1);

    set({ prices: priceMap });
  },
}));

export default usePriceStore;
