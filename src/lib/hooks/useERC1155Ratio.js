import { useContractRead } from "wagmi";

import { erc20Options } from "src/abis";

import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

function useERC1155Ratio() {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.GET_RATIO);

  const query = useContractRead({ ...options });

  return {
    ...query,
    ratio: !!query.data ? Number(query.data) : null,
  };
}

export { useERC1155Ratio };
