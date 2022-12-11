import { useContractRead } from "wagmi";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";
import { erc20Options } from "src/abis";

function useERC1155Id() {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.GET_ERC1155_ID);

  const query = useContractRead({ ...options });

  return {
    ...query,
    id: !!query.data ? Number(query.data) : null,
  };
}

export { useERC1155Id };
