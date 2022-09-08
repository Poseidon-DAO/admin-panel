import { useWeb3ExecuteFunction } from "react-moralis";
import { erc20Options } from "src/abis";

import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

function useERC1155Ratio() {
  const options = erc20Options(null, SMART_CONTRACT_FUNCTIONS.GET_RATIO);

  const result = useWeb3ExecuteFunction(options);

  return {
    ...result,
    ratio: !!result.data ? Number(result.data) : null,
    fetchRatio: result.fetch,
  };
}

export { useERC1155Ratio };
