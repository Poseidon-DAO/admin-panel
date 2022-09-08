import { useWeb3ExecuteFunction } from "react-moralis";
import { erc20Options } from "src/abis";

import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

function useERC1155Id() {
  const options = erc20Options(null, SMART_CONTRACT_FUNCTIONS.GET_ERC1155_ID);

  const result = useWeb3ExecuteFunction(options);

  return {
    ...result,
    id: !!result.data ? Number(result.data) : null,
    fetchId: result.fetch,
  };
}

export { useERC1155Id };
