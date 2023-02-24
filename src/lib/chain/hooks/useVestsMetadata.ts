import { ethers } from "ethers";
import { useContractReads } from "wagmi";
import web3 from "web3";
import { erc20Options } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";

type IProps = {
  address: string;
  vestLength: number | null;
  enabled?: boolean;
};

const useVestsMetadata = ({
  vestLength = 0,
  address = "",
  enabled = true,
}: IProps) => {
  const indexes = Array.from(Array(vestLength).keys());

  const query = useContractReads({
    // @ts-ignore
    contracts: indexes.map((vestId) =>
      erc20Options(SMART_CONTRACT_FUNCTIONS.GET_VEST_METADATA, [
        `${vestId}`,
        address,
      ])
    ),
    enabled:
      !!indexes.length && !!address && web3.utils.isAddress(address) && enabled,
    watch: true,
  });

  const vestsMetadata = web3.utils.isAddress(address)
    ? (query?.data || []).map((vestMetadata, index) => {
        return {
          amount: ethers.utils.formatEther(
            Array.isArray(vestMetadata) && vestMetadata[0]
          ),
          expirationBlockHeight: Number(
            Array.isArray(vestMetadata) && vestMetadata[1]
          ),
          vestIndex: index,
        };
      })
    : [];

  return {
    vestsMetadata,
    vestsLengthStatus: query.status,
  };
};

export { useVestsMetadata };
