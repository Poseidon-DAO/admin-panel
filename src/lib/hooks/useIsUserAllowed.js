import { multiSigOptions } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { useAccount } from "wagmi";

function useIsUserAllowed({ account } = {}) {
  const { address } = useAccount();

  const options = multiSigOptions(
    account || address,
    SMART_CONTRACT_FUNCTIONS.GET_IS_MULTISIG_ADDRESS
  );

  const result = null; // useWeb3ExecuteFunction(options);

  return {
    ...result,
    isAllowed: result.data || true,
    fetchIsUserAllowed: result.fetch,
  };
}

export { useIsUserAllowed };
