import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { multiSigOptions } from "src/abis";

import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

function useIsUserAllowed({ account } = {}) {
  const { user } = useMoralis();

  const options = multiSigOptions(
    account || user?.get("ethAddress"),
    SMART_CONTRACT_FUNCTIONS.GET_IS_MULTISIG_ADDRESS
  );

  const result = useWeb3ExecuteFunction(options);

  return {
    ...result,
    isAllowed: result.data,
    fetchIsUserAllowed: result.fetch,
  };
}

export { useIsUserAllowed };
