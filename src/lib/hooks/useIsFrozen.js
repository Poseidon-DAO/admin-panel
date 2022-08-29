import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { accessibilityOptions } from "src/abis";

import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

function useIsFrozen({ account } = {}) {
  const { user } = useMoralis();

  const options = accessibilityOptions(
    account || user?.get("ethAddress"),
    SMART_CONTRACT_FUNCTIONS.CHECK_IS_FROZEN
  );

  const result = useWeb3ExecuteFunction(options);

  return {
    ...result,
    fetchIsFrozen: result.fetch,
  };
}

export { useIsFrozen };
