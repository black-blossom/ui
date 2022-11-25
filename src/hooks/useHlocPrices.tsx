import create from 'zustand';

import HLOC_PRICES_MOCKDATA from './../mockdata/hloc-prices';

interface HlocPricesProps {
  data: any[];
  fetch: () => void;
};

const useHlocPrices = create<HlocPricesProps>((set) => ({
  data: [],
  fetch: () => {
    set({data: [{ data: HLOC_PRICES_MOCKDATA }]});
  }
}));

export default useHlocPrices;
