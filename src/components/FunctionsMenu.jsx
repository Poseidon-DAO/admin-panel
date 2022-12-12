import { useState, useEffect } from "react";
import { Chip, Container, Stack, Typography } from "@mui/material";
import { baseEtherscan } from "src/types";
import { useFreeze } from "src/lib";

import PollArgumentsModal from "./PollArgumentsModal";
import CustomSnackbar from "./CustomSnackbar";
import FreezeAlert from "./FreezeAlert";

export default function FunctionsMenu({ availableFunctions }) {
  const [error, setError] = useState("");
  const [successfulTransaction, setSuccessfulTransaction] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [modalProps, setModalProps] = useState(null);
  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false);

  const { freeze, freezeStatus, freezeData, freezeError } = useFreeze();

  useEffect(() => {
    if (freezeStatus === "success") {
      setSuccessfulTransaction(freezeData?.hash);
      onCancelModal();
    }

    if (freezeStatus === "error") {
      setError(freezeError.message ?? "Something went wrong");
    }
  }, [freezeStatus, freezeData, freezeError]);

  const handleClick = (fn) => {
    if (fn.inputRequired) {
      setModalProps(fn);
      setModalActive(true);
    } else {
      handleExecuteFunction(fn);
    }
  };

  const onCancelModal = () => {
    setModalActive(false);
    setModalProps(null);
  };

  function handleFreezeClick(callback) {
    if (callback.functionName === "freeze") {
      return setIsFreezeDialogOpen(true);
    }

    handleClick(callback);
  }

  function handleExecuteFunction() {
    freeze?.();
  }

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
          {availableFunctions.map((fn, i) => (
            <Chip
              key={i}
              label={fn.name}
              variant="outlined"
              color={fn.functionName === "freeze" ? "error" : "primary"}
              onClick={() => handleFreezeClick(fn)}
            />
          ))}
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
