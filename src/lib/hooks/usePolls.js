import { useAccount, useContractRead, useContractReads } from "wagmi";

import { multiSigOptions } from "src/contracts/options";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { fHex } from "src/utils/formatNumber";

const BLOCK_DURATION_SECS = 15000;
const setUpPoll = (
  description,
  pollData,
  expiration,
  currentVote,
  multiSigLength,
  pollID
) => {
  const poll = {};
  poll.description = description;
  poll.type = fHex(pollData[0]?._hex);
  poll.blockStart = pollData[1]?._hex;
  poll.voteReceiverAddress = pollData[2]?._hex;
  poll.amountApprovedVoteReceiver = fHex(pollData[3]?._hex);
  poll.expiration = fHex(expiration._hex) * BLOCK_DURATION_SECS;
  poll.currentVote = fHex(currentVote._hex);
  poll.multiSigLength = fHex(multiSigLength._hex);
  poll.pollID = pollID;

  return poll;
};

function usePolls() {
  const { address } = useAccount();

  const activePollsQuery = useContractRead(
    multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_ACTIVE_POLLS)
  );
  const activePolls = activePollsQuery.data || [];
  const activePollsFetched = activePollsQuery.isSuccess;
  console.log({
    isLoading: activePollsQuery.status,
    a: activePollsQuery.isLoading,
  });

  const pollsMetadataQuery = useContractReads({
    contracts: activePolls.map((poll) =>
      multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_POLL_META, [poll._hex])
    ),
    enabled: !!activePolls.length && activePollsFetched,
  });
  const pollsMetadata = pollsMetadataQuery.data || [];

  const expirationBlocksQuery = useContractReads({
    contracts: activePolls.map((poll) =>
      multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_EXPIRATION_BLOCK, [
        poll._hex,
      ])
    ),
    enabled: !!activePolls.length && activePollsFetched,
  });
  const pollsExpirationBlock = expirationBlocksQuery.data || [];

  const currentVoteQuery = useContractReads({
    contracts: activePolls.map((poll) =>
      multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_VOTE, [address, poll._hex])
    ),
    enabled: !!activePolls.length && activePollsFetched,
  });
  const pollsCurrentVote = currentVoteQuery.data || [];

  const multisigLengthQuery = useContractRead({
    ...multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_MULTISIG_LENGTH),
    enabled: !!activePolls.length && activePollsFetched,
  });
  const multisigLength = multisigLengthQuery.data;

  const polls = activePolls.map((poll, index) => {
    if (
      !pollsMetadata.length &&
      !pollsExpirationBlock.length &&
      !pollsCurrentVote.length
    )
      return [];

    return setUpPoll(
      "DESC IS MISSING",
      pollsMetadata[index],
      pollsExpirationBlock[index],
      pollsCurrentVote[index],
      multisigLength,
      poll._hex
    );
  });

  const pendingPolls = polls.filter((poll) => poll.currentVote === 0);
  const votedPolls = polls.filter((poll) => poll.currentVote === 1);

  return {
    polls,
    pendingPolls,
    votedPolls,
    pollsStatus: activePollsQuery.status,
    pollsError: activePollsQuery.error,
    metadataStatus: pollsMetadataQuery.status,
    metadataError: pollsMetadataQuery.error,
    expirationBlocksStatus: expirationBlocksQuery.status,
    expirationBlocksError: expirationBlocksQuery.error,
    currentVoteStatus: currentVoteQuery.status,
    currentVoteError: currentVoteQuery.error,
    multiSigLengthStatus: multisigLengthQuery.status,
    multiSigLengthError: multisigLengthQuery.error,
    isLoading:
      activePollsQuery.status === "loading" ||
      pollsMetadataQuery.status === "loading" ||
      expirationBlocksQuery.status === "loading" ||
      currentVoteQuery.status === "loading" ||
      multisigLengthQuery.status === "loading",
  };
}

export { usePolls };
