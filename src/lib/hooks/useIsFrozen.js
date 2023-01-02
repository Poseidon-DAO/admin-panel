import { accessibilityOptions } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import { useContractRead } from "wagmi";

function useIsFrozen() {
  const options = accessibilityOptions(
    SMART_CONTRACT_FUNCTIONS.CHECK_IS_FROZEN
  );

  const query = useContractRead({ ...options, watch: true });

  return {
    isFrozen: query.data,
    isFrozenStatus: query.status,
    isFrozenError: query.error,
  };
}

export { useIsFrozen };
