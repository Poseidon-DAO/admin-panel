import { useContractRead } from "wagmi";

import { erc20Options } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";

const useIsAllowedToBurn = () => {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.GET_IS_ALLOWED_TO_BURN);

  const query = useContractRead({ ...options, watch: true });

  return {
    isAllowedToBurn: !!query.data ? query.data : null,
    isFetchingBurnAllowance: query.isFetching,
    isLoadingBurnAllowance: query.isLoading,
  };
};

export { useIsAllowedToBurn };
