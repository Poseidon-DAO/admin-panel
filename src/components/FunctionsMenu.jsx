import { Chip, Container, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { accessibilityEventsOptions, accessibilityOptions } from "src/abis";
import { baseEtherscan } from "src/types";
import PollArgumentsModal from "./PollArgumentsModal";
import CustomSnackbar from "./CustomSnackbar";
import FreezeAlert from "./FreezeAlert";

export default function FunctionsMenu({ availableFunctions }) {
  const [error, setError] = useState("");
  const [successfulTransaction, setSuccessfulTransaction] = useState("");
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, account } = useMoralis();
  const [modalActive, setModalActive] = useState(false);
  const [modalProps, setModalProps] = useState(null);
  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false);

  const fetchEvents = useCallback(
    async (event) => {
      const options = accessibilityEventsOptions(event.name);
      const res = await Web3Api.native.getContractEvents(options);
      //What to do when we receive the events
      console.log("Event fetch response: ", res);
      return res;
    },
    [Web3Api]
  );

  const handleClick = (fn) => {
    if (account) {
      if (fn.inputRequired) {
        setModalProps(fn);
        setModalActive(true);
      } else {
        handleExecuteFunction(fn);
      }
    }
  };

  const onCancelModal = () => {
    setModalActive(false);
    setModalProps(null);
  };

  const handleExecuteFunction = useCallback(
    async (fn, args) => {
      try {
        const options = accessibilityOptions(account, fn.functionName, args);
        const res = await Moralis.executeFunction(options);
        if (fn.event) {
          const evt = await fetchEvents(fn.event);
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
    },
    [Moralis, account, fetchEvents]
  );

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Accessibility's Available Functions
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {availableFunctions.map((fn, i) => (
              <Chip
                key={i}
                label={fn.name}
                variant="outlined"
                color={fn.functionName === "freeze" ? "error" : "primary"}
                onClick={() =>
                  fn.functionName === "freeze"
                    ? setIsFreezeDialogOpen(true)
                    : handleClick(fn)
                }
              />
            ))}
          </Stack>
        </Stack>
      </Container>

      <FreezeAlert
        onFreezeCanceled={() => setIsFreezeDialogOpen(false)}
        onFreezeConfirmed={() => {
          setIsFreezeDialogOpen(false);
          handleClick(
            availableFunctions.filter((f) => f.functionName === "freeze")[0]
          );
        }}
        open={isFreezeDialogOpen}
      />

      <PollArgumentsModal
        open={modalActive}
        handleClose={onCancelModal}
        handleAccept={handleExecuteFunction}
        fnc={modalProps}
      />

      <CustomSnackbar
        isOpen={error.length > 0}
        type="error"
        onClose={() => setError("")}
        message={error}
      />
      <CustomSnackbar
        isOpen={!!successfulTransaction.length}
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
              {successfulTransaction.slice(0, 8) +
                successfulTransaction.slice(-4)}
            </a>
          </Typography>
        }
      />
    </>
  );
}
