import { useContractRead } from "wagmi";

import { erc20Options } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";

const useSecurityDelayInBlocks = () => {
  const options = erc20Options(
    SMART_CONTRACT_FUNCTIONS.GET_SECURITY_DELAY_IN_BLOCKS
  );

  const query = useContractRead({ ...options, watch: true });

  return {
    delayInBlocks: !!query.data ? Number(query.data) : null,
    isFetchingDelayInBlocks: query.isFetching,
    isLoadingDelayInBlocks: query.isLoading,
  };
};

export { useSecurityDelayInBlocks };
