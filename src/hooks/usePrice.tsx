const usePrice = (pair: string): number => {
  let price = 0;

  if(pair === 'ETH/USD') price = 1185.37;
  else if(pair === 'BTC/USD') price = 16743.18;
  else if(pair === 'ETH/BTC') price = 0.07079;
  else if(pair === 'MATIC/USD') price = 0.7949;
  else if(pair === 'MATIC/ETH') price = 0.00067059;
  else if(pair === 'MATIC/BTC') price = 0.00004748;

  return price;
};

export default usePrice;
