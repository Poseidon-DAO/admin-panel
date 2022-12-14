import { erc20Options } from "src/contracts/options";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";

function useAirdrop({ accounts, isVestingActive = null }) {
  const options = erc20Options(
    isVestingActive
      ? SMART_CONTRACT_FUNCTIONS.RUN_AIR_DROP_VESTING
      : SMART_CONTRACT_FUNCTIONS.RUN_AIR_DROP
  );

  const args = isVestingActive
    ? [
        accounts.map((account) => account.address),
        accounts.map((account) =>
          ethers.utils.parseUnits(account.amount.toString() || "0", 18)
        ),
        accounts.map((account) => account.vestingAmount),
      ]
    : [
        accounts.map((account) => account.address),
        accounts.map((account) =>
          ethers.utils.parseUnits(account.amount.toString() || "0", 18)
        ),
      ];

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!accounts.length,
    args: !!accounts.length ? args : [],
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

export { useAirdrop };
