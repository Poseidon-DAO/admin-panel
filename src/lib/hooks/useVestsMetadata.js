import { ethers } from "ethers";
import { useContractReads } from "wagmi";
import { erc20Options } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

function useVestsMetadata({ vestLength = 0, address = "", enabled = true }) {
  const indexes = Array.from(Array(vestLength).keys());

  const query = useContractReads({
    contracts: indexes?.map((vestId) =>
      erc20Options(SMART_CONTRACT_FUNCTIONS.GET_VEST_METADATA, [
        `${vestId}`,
        address,
      ])
    ),
    enabled: !!indexes.length && !!address && enabled,
    watch: true,
  });

  const vestsMetadata = (query?.data || []).map((vestMetadata, index) => {
    if (!Array.isArray(vestMetadata)) {
      return {
        amount: "",
        expirationBlockHeight: "",
      };
    }

    return {
      amount: ethers.utils.formatEther(vestMetadata[0]),
      expirationBlockHeight: Number(vestMetadata[1]),
      vestIndex: index,
    };
  });

  return {
    vestsMetadata: vestsMetadata,
    vestsLengthStatus: query.status,
  };
}

export { useVestsMetadata };
