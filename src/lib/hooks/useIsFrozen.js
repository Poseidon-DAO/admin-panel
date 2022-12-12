import { accessibilityOptions } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { useAccount, useContractRead } from "wagmi";

function useIsFrozen({ account } = {}) {
  const { address } = useAccount();

  const options = accessibilityOptions(
    account || address,
    SMART_CONTRACT_FUNCTIONS.CHECK_IS_FROZEN
  );

  const query = useContractRead({ ...options });

  return {
    ...query,
    isFrozen: query.data,
    isFrozenStatus: query.status,
    isFrozenError: query.error,
  };
}

export { useIsFrozen };
