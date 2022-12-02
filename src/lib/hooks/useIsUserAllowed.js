import { multiSigOptions } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { useAccount, useContractRead } from "wagmi";

function useIsUserAllowed() {
  const { address } = useAccount();

  const options = multiSigOptions(
    SMART_CONTRACT_FUNCTIONS.GET_IS_MULTISIG_ADDRESS,
    [address]
  );

  const query = useContractRead({ ...options });

  return {
    ...query,
    isAllowed: !!query.data,
  };
}

export { useIsUserAllowed };
