import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { accessibilityOptions } from "src/contracts/options";
import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";

function useFreezeRestore() {
  const options = accessibilityOptions(
    SMART_CONTRACT_FUNCTIONS.RESTORE_DAO_FREEZE
  );

  const { config } = usePrepareContractWrite({ ...options });

  const { data, write } = useContractWrite(config);

  const { isSuccess, status, error } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    defreeze: write,
    defreezeData: data,
    defreezSuccess: isSuccess,
    defreezeStatus: status,
    defreezeError: error,
  };
}

export { useFreezeRestore };
