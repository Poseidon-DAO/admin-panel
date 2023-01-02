import { ethers } from "ethers";
import { erc20Options } from "src/contracts/options";
import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

function useTransfer({ address, amount = 0 } = {}) {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.TRANSFER);

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!address && !!amount,
    args: [address, ethers.utils.parseUnits(amount.toString() || "0", 18)],
  });

  const { data, write, isFetching } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    transfer: write,
    transferData: data,
    isTransferSuccess: isSuccess,
    isFetchingTransfer: isFetching,
    transferStatus: status,
  };
}

export { useTransfer };
