import { erc20Options } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import { useContractRead } from "wagmi";

const usePDNSymbol = () => {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.SYMBOL);

  const query = useContractRead({ ...options });

  return {
    ...query,
    symbol: query.data,
  };
};

export { usePDNSymbol };
