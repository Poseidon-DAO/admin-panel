import { accessibilityOptions } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { useAccount } from "wagmi";

function useIsFrozen({ account } = {}) {
  const { address } = useAccount();

  const options = accessibilityOptions(
    account || address,
    SMART_CONTRACT_FUNCTIONS.CHECK_IS_FROZEN
  );

  const result = null; // useWeb3ExecuteFunction(options);

  return {
    ...result,
    isFrozen: result.data,
    fetchIsFrozen: result.fetch,
  };
}

export { useIsFrozen };
