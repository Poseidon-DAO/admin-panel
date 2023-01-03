import { erc20Options } from "src/contracts/options";
import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

type IProps = {
  address: string;
  start: number | null;
  end: number | null;
};

const useDeleteUnexpiredVests = ({ address, start, end }: IProps) => {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.DELETE_UNEXPIRED_VESTS);

  const { config } = usePrepareContractWrite({
    ...options,
    args: [address, start, end],
    enabled: !!address && !!start && !!end && start >= 0 && end >= 0,
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
};

export { useDeleteUnexpiredVests };
