import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { accessibilityOptions } from "src/contracts/options";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

function useFreeze({ enabled = true }) {
  const options = accessibilityOptions(SMART_CONTRACT_FUNCTIONS.FREEZE_DAO);

  const { config } = usePrepareContractWrite({ ...options, enabled });

  const { data, write } = useContractWrite(config);

  const { isSuccess, status, error } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    freeze: write,
    freezeData: data,
    isFrozenSuccess: isSuccess,
    freezeStatus: status,
    freezeError: error,
  };
}

export { useFreeze };
