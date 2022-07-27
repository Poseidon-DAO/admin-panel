// components
import Page from "../components/Page";
import { useCallback, useEffect } from "react";
import { multiSigEventsOptions, multiSigOptions } from "src/abis";
import { useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";
import PollComponent from "src/components/PollComponent";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import PollArgumentsModal from "src/components/PollArgumentsModal";
import CustomSnackbar from "src/components/CustomSnackbar";
import { baseEtherscan } from "src/types";
import { fHex } from "src/utils/formatNumber";
import { useMemo } from "react";

const BLOCK_DURATION_SECS = 15000;
const MORALIS_OBJECT_NAME = "Polls";

const CREATE_MULTISIG_POLL = {
  name: "Create Poll",
  functionName: SMART_CONTRACT_FUNCTIONS.CREATE_MULTISIG_POLL,
  inputRequired: true,
  args: [
    {
      name: "_pollTypeID",
      type: Number,
    },
    {
      name: "_voteReceiverAddress",
      type: String,
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
  poll.type = fHex(pollData[0]._hex);
  poll.blockStart = pollData[1]._hex;
  poll.voteReceiverAddress = pollData[2];
  poll.amountApprovedVoteReceiver = fHex(pollData[3]._hex);
  poll.expiration = fHex(expiration._hex) * BLOCK_DURATION_SECS;
  poll.currentVote = fHex(currentVote._hex);
  poll.multiSigLength = fHex(multiSigLength._hex);
  poll.pollID = pollID;

  return poll;
};

export default function Polls() {
  const [error, setError] = useState("");
  const [successfulTransaction, setSuccessfulTransaction] = useState("");
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, account } = useMoralis();
  const [votedPolls, setVotedPolls] = useState([]);
  const [pendingPolls, setPendingPolls] = useState([]);

  const [isFetchingPolls, setIsFetchingPolls] = useState(true);

  const [modalActive, setModalActive] = useState(false);
  const [modalProps, setModalProps] = useState(null);

  // Moralis DB object
  const PollSubclass = Moralis.Object.extend(MORALIS_OBJECT_NAME);
  const poll = useMemo(() => new PollSubclass(), [PollSubclass]);

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
          newPoll.amountApprovedVoteReceiver =
            +newPoll.amountApprovedVoteReceiver + 1;
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

  const fetchActivePolls = useCallback(async () => {
    setPendingPolls([]);
    setVotedPolls([]);
    setIsFetchingPolls(true);
    const options = multiSigOptions(
      account,
      SMART_CONTRACT_FUNCTIONS.GET_ACTIVE_POLLS
    );

    // fetch all the polls
    const res = await Moralis.executeFunction(options);
    // Get the length of the multisig address list
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
      const description = await readMoralisDescription(fHex(el._hex));

      const poll = setUpPoll(
        description,
        metaData,
        expiration,
        currentVote,
        multiSigLength,
        el._hex
      );

      // Filter polls to diff lists by votes
      if (poll.currentVote === 0) {
        setPendingPolls((oldPollList) => [...oldPollList, poll]);
      } else {
        setVotedPolls((oldVotedPolls) => [...oldVotedPolls, poll]);
      }
    });

    // set loading spinner to false
    setTimeout(() => setIsFetchingPolls(false), 3000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis, account, getExpirationBlock]);

  const createNewMoralisEntry = useCallback(
    async (pollID, description) => {
      try {
        const res = await poll.save({ pollID, description });
        return res;
      } catch (e) {
        setError("Something went wrong when saving the description");
      }
    },
    [poll]
  );

  const readMoralisDescription = useCallback(
    async (pollID) => {
      try {
        const query = new Moralis.Query(MORALIS_OBJECT_NAME);
        query.equalTo("pollID", `${pollID}`);
        const res = await query.find();
        if (!res.length) return null;
        return res[0].attributes.description;
      } catch (e) {
        setError("Couldn't find a description for the poll");
      }
    },
    [Moralis.Query]
  );

  const onCreateMultisigPoll = useCallback(
    async (_, args, description) => {
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
            createNewMoralisEntry(evt.result[0].data.pollIndex, description);
            setSuccessfulTransaction(evt.result[0].transaction_hash);
            onCancelModal();
          }
          fetchActivePolls();
          return res;
        } catch (error) {
          setError((error[0] || error.message) ?? "Something went wrong");
          return error;
        }
      }
    },
    [account, Moralis, fetchEvents, fetchActivePolls, createNewMoralisEntry]
  );

  const pollGrid = (polls) => (
    <Box display="flex" flexWrap="wrap">
      {polls.map((poll, i) => (
        <Box margin={2} key={poll.pollID + i} minHeight="100%">
          <PollComponent
            poll={poll}
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
        {isFetchingPolls ? (
          <CircularProgress />
        ) : pendingPolls.length || votedPolls.length ? (
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
