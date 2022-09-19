import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { multiSigOptions } from "src/contracts/sc-options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

function useIsUserAllowed({ account } = {}) {
  const { user } = useMoralis();

  const options = multiSigOptions(
    account || user?.get("ethAddress"),
    SMART_CONTRACT_FUNCTIONS.GET_IS_MULTISIG_ADDRESS
  );

  const result = useWeb3ExecuteFunction(options);

  return {
    ...result,
    isAllowed: result.data || true,
    fetchIsUserAllowed: result.fetch,
  };
}

export { useIsUserAllowed };
