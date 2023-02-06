import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { erc20Options } from "src/contracts/options";
import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";

type IProps = {
  allow: boolean;
  enabled?: boolean;
};

const useBurnAllowance = ({ allow, enabled = true }: IProps) => {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.SET_ALLOW_BURNING);

  const { config } = usePrepareContractWrite({
    ...options,
    args: [allow],
    enabled,
  });

  const { data, write, status: writeStatus } = useContractWrite(config);

  const { status, error } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    setBurnAllowance: write,
    setBurnAllowanceData: data,
    setBurnAllowanceError: error,
    setBurnAllowanceStatus: status,
    setBurnAllowanceWriteStatus: writeStatus,
  };
};

export { useBurnAllowance };
