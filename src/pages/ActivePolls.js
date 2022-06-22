// components
import Page from "../components/Page";
import { useCallback, useEffect } from "react";
import {
  accessibilityEventsOptions,
  accessibilityOptions,
  multiSigEventsOptions,
  multiSigOptions,
} from "src/abis";
import { useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";
import PollComponent from "src/components/PollComponent";
import { Typography } from "@mui/material";

export default function ActivePolls({ isMultiSig }) {
  const [error, setError] = useState("");
  const [successfulTransaction, setSuccessfulTransaction] = useState("");
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, account } = useMoralis();
  const [pollList, setPollList] = useState([]);

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

  const setUpPoll = (pollData, expiration, currentVote) => {
    const poll = {};
    poll.type = parseInt(pollData[0]._hex, 16);
    poll.blockStart = pollData[1]._hex;
    poll.voteReceiverAddress = pollData[2]._hex;
    poll.amountApprovedVoteReceiver = pollData[3]._hex;
    poll.expiration = expiration._hex;
    poll.currentVote = parseInt(currentVote._hex, 16);

    return poll;
  };

  const fetchActivePolls = useCallback(async () => {
    const options = multiSigOptions(
      account,
      SMART_CONTRACT_FUNCTIONS.GET_ACTIVE_POLLS
    );
    const res = await Moralis.executeFunction(options);
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
      const poll = setUpPoll(metaData, expiration, currentVote);
      setPollList([...pollList, { ...poll }]);
    });
  }, [Moralis, account, getExpirationBlock, pollList]);

  useEffect(() => {
    fetchActivePolls();
  }, []);

  console.log(pollList);

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

  const handleClick = (fn) => {
    if (account) {
      handleExecuteFunction(fn);
    }
  };

  const handleExecuteFunction = useCallback(
    async (fn, args) => {
      try {
        if (account) {
          let options;
          if (isMultiSig)
            options = multiSigOptions(account, fn.functionName, args);
          else options = accessibilityOptions(account, fn.functionName, args);
          const res = await Moralis.executeFunction(options);
          if (fn.event) {
            const res = await fetchEvents(fn.event);
            if (res) {
              setSuccessfulTransaction(res.result[0].transaction_hash);
            }
          }
          return res;
        }
      } catch (error) {
        setError((error[0] || error.message) ?? "Something went wrong");
        return error;
      }
    },
    [Moralis, account, fetchEvents, isMultiSig]
  );
  return (
    <Page title="Active Polls">
      {pollList.length ? (
        pollList.map((poll) => (
          <PollComponent type={poll.type} vote={poll.currentVote} />
        ))
      ) : (
        <Typography>There are no active polls at the moment.</Typography>
      )}
    </Page>
  );
}
