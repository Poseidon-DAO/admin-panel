// components
import Page from "../components/Page";
import { useCallback, useEffect } from "react";
import {
  accessibilityEventsOptions,
  multiSigEventsOptions,
  multiSigOptions,
} from "src/abis";
import { useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";
import PollComponent from "src/components/PollComponent";
import { Chip, Typography } from "@mui/material";
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
      creator: "0x3d6AD09Ed37447b963A7f5470bF6C0003D36dEe3",
    },
    topic: "0x254281af94dadbfad557c2cdaea9d8277144968e60de2579b5102bffcfc1516d",
  },
};

export default function ActivePolls({ isMultiSig }) {
  const [error, setError] = useState("");
  const [successfulTransaction, setSuccessfulTransaction] = useState("");
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, account } = useMoralis();
  const [pollList, setPollList] = useState([]);
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

  console.log(pollList);

  const handleClick = () => {
    if (account) {
      setModalProps(CREATE_MULTISIG_POLL);
      setModalActive(true);
    }
  };

  const fetchEvents = useCallback(
    async (event) => {
      let options;
      if (isMultiSig) options = multiSigEventsOptions(event.name);
      else options = accessibilityEventsOptions(event.name);
      const res = await Web3Api.native.getContractEvents(options);
      //What to do when we receive the events
      console.log("Event fetch response: ", res);
      return res;
    },
    [Web3Api, isMultiSig]
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

  const handleVote = useCallback(
    async (_vote, _pollIndex) => {
      if (account) {
        try {
          let newPoll = pollList.find((poll) => poll.pollID === _pollIndex);
          const options = multiSigOptions(
            account,
            SMART_CONTRACT_FUNCTIONS.VOTE_MULTISIG_POLL,
            { _pollIndex, _vote }
          );
          const res = await Moralis.executeFunction(options);
          newPoll.currentVote = _vote;
          setPollList([
            ...pollList.filter((el) => el.pollID !== _pollIndex, ...newPoll),
          ]);
          console.log(res);
          setSuccessfulTransaction();
          return res;
        } catch (e) {
          setError((error[0] || error.message) ?? "Something went wrong");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, Moralis, error]
  );

  const onCreateMultisigPoll = useCallback(
    async (_, args) => {
      console.log(args);
      if (account) {
        try {
          const options = multiSigOptions(
            account,
            CREATE_MULTISIG_POLL.functionName,
            args
          );
          const res = await Moralis.executeFunction(options);
          if (CREATE_MULTISIG_POLL.event) {
            const evt = await fetchEvents(CREATE_MULTISIG_POLL.event);
            if (evt) {
              setSuccessfulTransaction(evt.result[0].transaction_hash);
              onCancelModal();
            }
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
    console.log(res);
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
      const multiSigLength = await getMultiSigLength();
      const poll = setUpPoll(
        metaData,
        expiration,
        currentVote,
        multiSigLength,
        el._hex
      );
      setPollList([...pollList, { ...poll }]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis, account, getExpirationBlock, pollList]);

  return (
    <Page title="Active Polls">
      <Chip
        label={"Create New Poll"}
        variant="outlined"
        onClick={handleClick}
        style={{
          backgroundColor: "forestgreen",
          color: "white",
          position: "absolute",
          right: "10vw",
          height: "3rem",
          borderRadius: "50px",
          borderColor: "none",
        }}
      />
      <PollArgumentsModal
        open={modalActive}
        handleClose={onCancelModal}
        handleAccept={onCreateMultisigPoll}
        fnc={modalProps}
      />
      {pollList.length ? (
        pollList.map((poll) => (
          <PollComponent
            type={poll.type}
            vote={poll.currentVote}
            onApprove={() => handleVote(1, poll.pollID)}
            onDecline={() => handleVote(2, poll.pollID)}
          />
        ))
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
            The transaction was successful! Hash:
            <a
              target="_blank"
              rel="noreferrer"
              href={baseEtherscan + successfulTransaction}
            >
              {successfulTransaction}
            </a>
          </Typography>
        }
      />
    </Page>
  );
}
