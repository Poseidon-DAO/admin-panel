import { erc20Options } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

function usePDNSymbol() {
  const options = erc20Options(null, SMART_CONTRACT_FUNCTIONS.SYMBOL);

  const result = null; //useWeb3ExecuteFunction(options);

  return {
    ...result,
    symbol: result.data,
    fetchPDNSymbol: result.fetch,
  };
}

export { usePDNSymbol };
