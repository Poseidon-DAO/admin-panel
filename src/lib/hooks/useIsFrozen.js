import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { accessibilityOptions } from "src/contracts/sc-options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

function useIsFrozen({ account } = {}) {
  const { user } = useMoralis();

  const options = accessibilityOptions(
    account || user?.get("ethAddress"),
    SMART_CONTRACT_FUNCTIONS.CHECK_IS_FROZEN
  );

  const result = useWeb3ExecuteFunction(options);

  return {
    ...result,
    isFrozen: result.data,
    fetchIsFrozen: result.fetch,
  };
}

export { useIsFrozen };
