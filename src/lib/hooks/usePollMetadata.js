import { useContractRead } from "wagmi";
import { multiSigOptions } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { fHex } from "src/utils/formatNumber";

function usePollMetadata({ pollId } = {}) {
  const options = multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_POLL_META, [
    pollId,
  ]);

  const query = useContractRead({ ...options });

  const type = !!query.data && fHex(query.data[0]._hex);
  const blockStart = !!query.data && fHex(query.data[1]._hex);
  const voteReceiverAddress = !!query.data && query.data[2]._hex;
  const amountApprovedVoteReceiver = !!query.data && fHex(query.data[3]._hex);

  return {
    type,
    blockStart,
    voteReceiverAddress,
    amountApprovedVoteReceiver,
    metadataStatus: query.status,
    metadataError: query.error,
  };
}

export { usePollMetadata };
