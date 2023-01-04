import { useAccount, useContractRead, useContractReads } from "wagmi";

import { multiSigOptions } from "src/contracts/options";
import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";

const usePolls = () => {
  const { address } = useAccount();

  const activePollsQuery = useContractRead({
    ...multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_ACTIVE_POLLS),
    watch: true,
  });
  const activePolls = (activePollsQuery.data || []) as { _hex: string }[];
  const activePollsFetched = activePollsQuery.isSuccess;

  const currentVoteQuery = useContractReads({
    // @ts-ignore
    contracts: activePolls.map((poll) =>
      multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_VOTE, [address, poll._hex])
    ),
    enabled: !!activePolls.length && activePollsFetched,
  });
  const pollsCurrentVote = currentVoteQuery.data || [];

  const polls = activePolls.map((poll, index) => {
    return {
      ...poll,
      currentVote: Number(pollsCurrentVote[index]),
    };
  });

  const pendingPolls = polls.filter((poll) => poll.currentVote === 0);
  const votedPolls = polls.filter((poll) => poll.currentVote === 1);

  return {
    pendingPolls,
    votedPolls,
    pollsStatus: activePollsQuery.status,
    pollsError: activePollsQuery.error,
    currentVoteStatus: currentVoteQuery.status,
    currentVoteError: currentVoteQuery.error,
    isLoading:
      activePollsQuery.status === "loading" ||
      currentVoteQuery.status === "loading",
  };
};

export { usePolls };
