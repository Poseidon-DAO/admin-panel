import { useWeb3ExecuteFunction } from "react-moralis";
import { erc20Options } from "src/abis";

import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

function usePDNSymbol() {
  const options = erc20Options(null, SMART_CONTRACT_FUNCTIONS.SYMBOL);

  const result = useWeb3ExecuteFunction(options);

  return {
    ...result,
    symbol: result.data,
    fetchPDNSymbol: result.fetch,
  };
}

export { usePDNSymbol };
