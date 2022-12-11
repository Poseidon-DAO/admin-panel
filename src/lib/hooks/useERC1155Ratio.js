import { useContractRead } from "wagmi";

import { erc20Options } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

function useERC1155Ratio() {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.GET_RATIO);

  const query = useContractRead({ ...options });

  return {
    ratio: !!query.data ? Number(query.data) : null,
    isFetchingRatio: query.isFetching,
    isLoadingRatio: query.isLoading,
  };
}

export { useERC1155Ratio };
