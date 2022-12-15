import { erc20Options } from "src/contracts/options";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

function useDeleteUnexpiredVests({ address, start, end }) {
  const options = erc20Options(
    SMART_CONTRACT_FUNCTIONS.DELETE_UNEXPIRED_VESTS,
    [address, start, end]
  );

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!address && !!start && !!end,
  });

  const { data, write } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    deleteUnExpiredVests: write,
    deleteUnExpiredVestsData: data,
    isDeleteUnExpiredVestsSuccess: isSuccess,
    deleteUnExpiredVestsStatus: status,
  };
}

export { useDeleteUnexpiredVests };
