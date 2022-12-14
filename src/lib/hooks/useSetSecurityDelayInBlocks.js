import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { erc20Options } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

function useSetSecurityDelayInBlocks({ duration }) {
  const options = erc20Options(
    SMART_CONTRACT_FUNCTIONS.SET_SECURITY_DELAY_IN_BLOCKS,
    [duration]
  );

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!duration,
  });

  const { data, write } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    setDelayInBlocks: write,
    delayInBlocksData: data,
    delayInBlocksStatus: status,
    isSetDelayInBlocksSuccess: isSuccess,
  };
}

export { useSetSecurityDelayInBlocks };
