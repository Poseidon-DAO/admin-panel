// components
import Page from "../components/Page";
import { useCallback, useEffect } from "react";
import { multiSigEventsOptions, multiSigOptions } from "src/abis";
import { useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";
import PollComponent from "src/components/PollComponent";
import { Box, Chip, Container, Typography } from "@mui/material";
import PollArgumentsModal from "src/components/PollArgumentsModal";
import CustomSnackbar from "src/components/CustomSnackbar";
import { baseEtherscan } from "src/types";

const CREATE_MULTISIG_POLL = {
  name: "Create Poll",
  functionName: SMART_CONTRACT_FUNCTIONS.CREATE_MULTISIG_POLL,
  inputRequired: true,
  args: [
    {
      name: "_pollTypeID",
      type: Number,
    },
  ],
  event: {
    name: SMART_CONTRACT_FUNCTIONS.EVENT_NEW_MULTISIG,
    args: {
      pollType: 3,
      pollIndex: 1,
    },
  },
};

const VOTE_POLL = {
  name: "Vote Poll",
  functionName: SMART_CONTRACT_FUNCTIONS.VOTE_MULTISIG_POLL,
  inputRequired: true,
  args: [
    {
      name: "_pollTypeID",
      type: Number,
    },
  ],
  event: {
    name: SMART_CONTRACT_FUNCTIONS.EVENT_VOTE_MULTISIG,
    args: [
      {
        name: "voter",
        type: String,
      },
      {
        name: "pollIndex",
        type: Number,
      },
      {
        name: "vote",
        type: Number,
      },
    ],
  },
};

export default function Polls() {
  const [error, setError] = useState("");
  const [successfulTransaction, setSuccessfulTransaction] = useState("");
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, account } = useMoralis();

  const [votedPolls, setVotedPolls] = useState([]);
  const [pendingPolls, setPendingPolls] = useState([]);

  const [modalActive, setModalActive] = useState(false);
  const [modalProps, setModalProps] = useState(null);

  const onCancelModal = () => {
    setModalActive(false);
    setModalProps(null);
  };

  const getExpirationBlock = useCallback(
    async (_pollID) => {
      const options = multiSigOptions(
        account,
        SMART_CONTRACT_FUNCTIONS.GET_EXPIRATION_BLOCK,
        { _pollID }
      );
      const res = await Moralis.executeFunction(options);
      return res;
    },
    [Moralis, account]
  );

  const setUpPoll = (
    pollData,
    expiration,
    currentVote,
    multiSigLength,
    pollID
  ) => {
    const poll = {};
    poll.type = parseInt(pollData[0]._hex, 16);
    poll.blockStart = pollData[1]._hex;
    poll.voteReceiverAddress = pollData[2]._hex;
    poll.amountApprovedVoteReceiver = pollData[3]._hex;
    poll.expiration = expiration._hex;
    poll.currentVote = parseInt(currentVote._hex, 16);
    poll.multiSigLength = parseInt(multiSigLength._hex, 16);
    poll.pollID = pollID;

    return poll;
  };

  useEffect(() => {
    fetchActivePolls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (account) {
      setModalProps(CREATE_MULTISIG_POLL);
      setModalActive(true);
    }
  };

  const fetchEvents = useCallback(
    async (event, args) => {
      const options = multiSigEventsOptions(event.name, account, args);
      const res = await Web3Api.native.getContractEvents(options);
      return res;
    },
    [Web3Api, account]
  );

  const getCurrentVote = async (_pollID) => {
    const options = multiSigOptions(
      account,
      SMART_CONTRACT_FUNCTIONS.GET_VOTE,
      { _pollID, _voter: account }
    );
    const res = await Moralis.executeFunction(options);
    return res;
  };

  const getMultiSigLength = async () => {
    const options = multiSigOptions(
      account,
      SMART_CONTRACT_FUNCTIONS.GET_MULTISIG_LENGTH
    );
    const res = await Moralis.executeFunction(options);
    return res;
  };

  const changePollVote = useCallback((poll) => {
    setPendingPolls((prevPending) => [
      ...prevPending.filter((p) => p.pollID !== poll.pollID),
    ]);

    setVotedPolls((prevVoted) => [...prevVoted, poll]);
  }, []);

  const handleVote = useCallback(
    async (_vote, _pollIndex) => {
      if (account) {
        try {
          let newPoll = pendingPolls.find((poll) => poll.pollID === _pollIndex);
          const options = multiSigOptions(
            account,
            SMART_CONTRACT_FUNCTIONS.VOTE_MULTISIG_POLL,
            { _pollIndex, _vote }
          );
          const res = await Moralis.executeFunction(options);
          newPoll.currentVote = _vote;
          const voteEvents = await fetchEvents(VOTE_POLL.event, {
            voter: account,
            pollIndex: _pollIndex,
            vote: _vote,
          });
          setSuccessfulTransaction(voteEvents.result[0].transaction_hash);
          changePollVote(newPoll);
          return res;
        } catch (e) {
          console.log(e);
          setError((error[0] || error.message) ?? "Something went wrong");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, Moralis, error, pendingPolls]
  );

  const onCreateMultisigPoll = useCallback(
    async (_, args) => {
      if (account) {
        try {
          const options = multiSigOptions(
            account,
            CREATE_MULTISIG_POLL.functionName,
            args
          );
          const res = await Moralis.executeFunction(options);
          const evt = await fetchEvents(CREATE_MULTISIG_POLL.event);
          if (evt) {
            setSuccessfulTransaction(evt.result[0].transaction_hash);
            onCancelModal();
          }
          return res;
        } catch (error) {
          setError((error[0] || error.message) ?? "Something went wrong");
          return error;
        }
      }
    },
    [Moralis, account, fetchEvents]
  );

  const fetchActivePolls = useCallback(async () => {
    const options = multiSigOptions(
      account,
      SMART_CONTRACT_FUNCTIONS.GET_ACTIVE_POLLS
    );
    const res = await Moralis.executeFunction(options);
    const multiSigLength = await getMultiSigLength();
    res.map(async (el) => {
      // GET POLL METADATA FROM POLL ID
      const metaDataOptions = multiSigOptions(
        account,
        SMART_CONTRACT_FUNCTIONS.GET_POLL_META,
        { _pollID: el._hex }
      );
      const metaData = await Moralis.executeFunction(metaDataOptions);
      const expiration = await getExpirationBlock(el._hex);
      const currentVote = await getCurrentVote(el._hex);
      const poll = setUpPoll(
        metaData,
        expiration,
        currentVote,
        multiSigLength,
        el._hex
      ); // Filter polls to lists depending on if voted or not
      if (poll.currentVote === 0) {
        setPendingPolls((oldPollList) => [...oldPollList, poll]);
      } else {
        setVotedPolls((oldVotedPolls) => [...oldVotedPolls, poll]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis, account, getExpirationBlock]);

  const pollGrid = (polls) => (
    <Box display="flex" flexWrap="wrap">
      {polls.map((poll) => (
        <Box margin={2} key={poll.pollID}>
          <PollComponent
            type={poll.type}
            vote={poll.currentVote}
            onApprove={() => handleVote(1, poll.pollID)}
            onDecline={() => handleVote(2, poll.pollID)}
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <Page title="Active Polls" style={{ width: "100%" }}>
      <Container>
        <Container
          sx={{
            display: "flex",
            minWidth: "100%",
            justifyContent: "space-between",
            marginBottom: "2rem",
            alignItems: "center",
          }}
        >
          <h1>List of polls</h1>
          <Chip
            label={"Create New Poll"}
            variant="outlined"
            onClick={handleClick}
            style={{
              backgroundColor: "forestgreen",
              color: "white",
              height: "3rem",
              borderRadius: "50px",
              borderColor: "none",
            }}
          />
        </Container>
        <PollArgumentsModal
          open={modalActive}
          handleClose={onCancelModal}
          handleAccept={onCreateMultisigPoll}
          fnc={modalProps}
        />
        {pendingPolls.length || votedPolls.length ? (
          <>
            <Box sx={{ flexGrow: 1 }}>
              <h3>Active Polls</h3>
              {pollGrid(pendingPolls)}
            </Box>
            <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
              <h3>Voted Polls</h3>
              {pollGrid(votedPolls)}
            </Box>
          </>
        ) : (
          <Typography>There are no active polls at the moment.</Typography>
        )}
        <CustomSnackbar
          isOpen={error.length > 0}
          type="error"
          onClose={() => setError("")}
          message={error}
        />
        <CustomSnackbar
          isOpen={successfulTransaction.length}
          type="success"
          onClose={() => setSuccessfulTransaction("")}
          message={
            <Typography>
              The transaction was successful! Hash:{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={baseEtherscan + successfulTransaction}
              >
                {successfulTransaction.slice(0, 8) +
                  "..." +
                  successfulTransaction?.slice(-8)}
              </a>
            </Typography>
          }
        />
      </Container>
    </Page>
  );
}
