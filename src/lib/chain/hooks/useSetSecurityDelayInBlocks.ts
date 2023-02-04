import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { erc20Options } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";

type IProps = {
  duration: number | string;
};

const useSetSecurityDelayInBlocks = ({ duration }: IProps) => {
  const options = erc20Options(
    SMART_CONTRACT_FUNCTIONS.SET_SECURITY_DELAY_IN_BLOCKS,
    [duration]
  );

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!duration,
  });

  const { data, write, status: writeStatus } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    setDelayInBlocks: write,
    delayInBlocksData: data,
    delayInBlocksStatus: status,
    delayInBlocksWriteStatus: writeStatus,
    isSetDelayInBlocksSuccess: isSuccess,
  };
};

export { useSetSecurityDelayInBlocks };
