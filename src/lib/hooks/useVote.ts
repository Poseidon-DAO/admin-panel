import { multiSigOptions } from "src/contracts/options";
import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

type IProps = {
  pollIndex?: number | string;
  vote?: () => void;
};

const useVote = ({ pollIndex, vote }: IProps = {}) => {
  const options = multiSigOptions(SMART_CONTRACT_FUNCTIONS.VOTE_MULTISIG_POLL, [
    pollIndex,
    vote,
  ]);

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!pollIndex && !!vote,
  });

  const { data, write } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    vote: write,
    voteData: data,
    isVotingSuccess: isSuccess,
    voteStatus: status,
  };
};

export { useVote };
