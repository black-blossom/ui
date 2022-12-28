import create from 'zustand';

import getPrice from '../utils/getPrice';
import { PAIRSLIST } from '../utils/pairs';

interface PriceStore {
  price: Map<string, number>
  updatePrices: number

  usePrice: (pair: string) => number
  subscribe: (chainId: number) => void
  fetchPrices: (chainId: number) => Promise<void>
};

const usePriceStore = create<PriceStore>((set, get) => ({
  price: new Map<string, number>(),
  updatePrices: 0,

  usePrice: (pair) => {
    const price = get().price.get(pair);
    return (price !== undefined ? price : 0 );
  },

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

    set({ price: priceMap });
  },
}));

export default usePriceStore;
