import { erc20Options } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import { useContractRead } from "wagmi";

const useERC1155Address = () => {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.GET_ERC1155_ADDRESS);

  const query = useContractRead({ ...options });

  return {
    address: query.data,
    isFetchingAddress: query.isFetching,
    isLoadingAddress: query.isLoading,
  };
};

export { useERC1155Address };
