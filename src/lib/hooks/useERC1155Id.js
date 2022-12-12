import { useContractRead } from "wagmi";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { erc20Options } from "src/contracts/options";

function useERC1155Id() {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.GET_ERC1155_ID);

  const query = useContractRead({ ...options });

  return {
    id: !!query.data ? Number(query.data) : null,
    isFetchingId: query.isFetching,
    isLoadingId: query.isLoading,
  };
}

export { useERC1155Id };
