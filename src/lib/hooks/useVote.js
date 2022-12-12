import { multiSigOptions } from "src/contracts/options";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

function useVote({ pollIndex, vote } = {}) {
  const options = multiSigOptions(SMART_CONTRACT_FUNCTIONS.VOTE_MULTISIG_POLL, [
    pollIndex,
    vote,
  ]);

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!pollIndex && !!vote,
  });

  const { data, write, isFetching } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    vote: write,
    voteData: data,
    isVotingSuccess: isSuccess,
    isFetchingVote: isFetching,
    voteStatus: status,
  };
}

export { useVote };
