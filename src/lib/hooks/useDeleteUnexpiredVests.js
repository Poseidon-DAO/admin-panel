import { erc20Options } from "src/contracts/options";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

function useDeleteUnexpiredVests({ accounts }) {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.RUN_AIR_DROP);

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!accounts.length,
    args: !!accounts.length
      ? [
          accounts.map((account) => account.address),
          accounts.map((account) => account.amount),
          18,
        ]
      : [],
  });

  const { data, write } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    runAirdrop: write,
    airdropData: data,
    isAirdropSuccess: isSuccess,
    transferStatus: status,
  };
}

export { useDeleteUnexpiredVests };
