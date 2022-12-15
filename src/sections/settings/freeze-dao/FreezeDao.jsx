import { useState, useEffect } from "react";
import {
  useTheme,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { useFreeze, /* useFreezeRestore */ useIsFrozen } from "src/lib";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import { getTransactionLink } from "src/utils/getTransactionLink";

import FreezeModal from "./FreezeModal";

export default function FreezeDao() {
  const theme = useTheme();

  const { isFrozen } = useIsFrozen();

  const [transactionState, setTransactionState] = useState("");
  const [isFreezeModalOpen, setFreezeModalOpen] = useState(false);

  const { freeze, freezeData, freezeStatus } = useFreeze({
    enabled: !isFrozen,
  });
  //   const { defreeze, defreezeData, defreezeStatus } = useFreezeRestore();

  useEffect(() => {
    if (
      freezeStatus === "error"
      //  || defreezeStatus === "error"
    ) {
      setTransactionState("error");
    }

    if (
      freezeStatus === "loading"
      // || defreezeStatus === "loading"
    ) {
      setTransactionState("info");
    }

    if (
      freezeStatus === "success"
      //  || defreezeStatus === "success"
    ) {
      setTransactionState("success");
    }
  }, [
    freezeStatus,
    //  defreezeStatus
  ]);

  function handleModalChange() {
    setFreezeModalOpen((isOpen) => !isOpen);
  }

  function handleSnackbarClose() {
    setTransactionState("");
  }

  function handleDaoFreeze() {
    freeze?.();
  }

  const isVerifing = freezeStatus === "loading";
  //   || defreezeStatus === "loading";

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
        color={theme.palette.grey["600"]}
      >
        <>
          <Grid item sm={10}>
            <Typography variant="subtitle1">Dao status</Typography>
          </Grid>
          <Grid item sm={2} ml={-8}>
            {isFrozen ? (
              <Chip label="FROZEN" color="error" style={{ color: "white" }} />
            ) : (
              <Chip label="ACTIVE" color="success" style={{ color: "white" }} />
            )}
          </Grid>
          <Grid container item sm={1} justifyContent="flex-end">
            {isVerifing ? (
              <Box marginRight={2}>
                <CircularProgress size={20} />
              </Box>
            ) : isFrozen ? (
              <Button variant="contained" color="error" disabled>
                Activate
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={handleModalChange}
              >
                Freeze
              </Button>
            )}
          </Grid>
        </>
      </Grid>

      <FreezeModal
        isOpen={isFreezeModalOpen}
        onCancel={handleModalChange}
        onSubmit={handleDaoFreeze}
      />

      {!!transactionState && (
        <TransactionSnackbar
          message={isVerifing ? "The transaction is being verified!" : null}
          variant={transactionState}
          onClose={handleSnackbarClose}
          duration={isVerifing ? null : 3000}
          etherscanLink={getTransactionLink(
            freezeData?.hash
            // || defreezeData.hash
          )}
          loading={isVerifing}
        />
      )}
    </>
  );
}
