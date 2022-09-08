import { useWeb3ExecuteFunction } from "react-moralis";
import { erc20Options } from "src/abis";

import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

function useERC1155Address() {
  const options = erc20Options(
    null,
    SMART_CONTRACT_FUNCTIONS.GET_ERC1155_ADDRESS
  );

  const result = useWeb3ExecuteFunction(options);

  return {
    ...result,
    address: result.data,
    fetchAddress: result.fetch,
  };
}

export { useERC1155Address };
