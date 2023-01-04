import { useContractRead } from "wagmi";
import { multiSigOptions } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import { fHex } from "src/utils/formatNumber";

type IProps = {
  pollId?: string | number;
};

const usePollMetadata = ({ pollId }: IProps = {}) => {
  const options = multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_POLL_META, [
    pollId,
  ]);

  const query = useContractRead({ ...options });

  const type =
    !!query.data && Array.isArray(query.data) && fHex(query.data[0] as string);
  const blockStart =
    !!query.data && Array.isArray(query.data) && fHex(query.data[1] as string);
  const voteReceiverAddress =
    !!query.data && Array.isArray(query.data) && (query.data[2] as string);
  const amountApprovedVoteReceiver =
    !!query.data && Array.isArray(query.data) && fHex(query.data[3] as string);

  return {
    type,
    blockStart,
    voteReceiverAddress,
    amountApprovedVoteReceiver,
    metadataStatus: query.status,
    metadataError: query.error,
  };
};

export { usePollMetadata };
