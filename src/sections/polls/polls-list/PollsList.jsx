import { Box } from "@mui/material";
import PollComponent from "src/components/PollComponent";

function PollsList({ polls = [] }) {
  const handleVote = async (_vote, _pollIndex) => {
    if (true) {
      // try {
      //   let newPoll = pendingPolls.find((poll) => poll.pollID === _pollIndex);
      //   const options = multiSigOptions(
      //     address,
      //     SMART_CONTRACT_FUNCTIONS.VOTE_MULTISIG_POLL,
      //     { _pollIndex, _vote }
      //   );
      //   const res = await Moralis.executeFunction(options);
      //   newPoll.currentVote = _vote;
      //   newPoll.amountApprovedVoteReceiver =
      //     +newPoll.amountApprovedVoteReceiver + 1;
      //   const voteEvents = await fetchEvents(VOTE_POLL.event, {
      //     voter: account,
      //     pollIndex: _pollIndex,
      //     vote: _vote,
      //   });
      //   setSuccessfulTransaction(voteEvents.result[0].transaction_hash);
      //   changePollVote(newPoll);
      //   return res;
      // } catch (e) {
      //   console.log(e);
      //   setError((error[0] || error.message) ?? "Something went wrong");
      // }
    }
  };

  return (
    <Box display="flex" flexWrap="wrap" margin="16px 0">
      {polls.map((poll) => (
        <Box
          marginRight={2}
          marginBottom={2}
          key={poll.pollID}
          minHeight="100%"
        >
          <PollComponent
            poll={poll}
            onApprove={() => handleVote(1, poll.pollID)}
            onDecline={() => handleVote(2, poll.pollID)}
          />
        </Box>
      ))}
    </Box>
  );
}

export { PollsList };
