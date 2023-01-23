import { multiSigOptions } from "src/contracts/options";
import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

type IProps = {
  args: (string | number)[];
};

const useCreatePoll = ({ args }: IProps) => {
  const options = multiSigOptions(
    SMART_CONTRACT_FUNCTIONS.CREATE_MULTISIG_POLL
  );

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!args.length,
    args,
  });

  const { data, write } = useContractWrite(config);

  const { isSuccess, status, error } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    createPoll: write,
    pollCreationResult: data,
    pollCreationStatus: status,
    pollCreationError: error,
    isPollCreationSuccess: isSuccess,
  };
};

export { useCreatePoll };
