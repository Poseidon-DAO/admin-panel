import { ethers } from "ethers";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { erc20Options } from "src/contracts/options";
import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";

type IProps = {
  address: string;
  amount?: number | string;
};

const useTransfer = ({ address, amount = 0 }: IProps) => {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.TRANSFER);

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!address && !!amount,
    args: [address, ethers.utils.parseUnits(amount.toString() || "0", 18)],
  });

  const { data, write } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    transfer: write,
    transferData: data,
    isTransferSuccess: isSuccess,
    transferStatus: status,
  };
};

export { useTransfer };
