import { useState, useEffect } from "react";
import {
  useTheme,
  Grid,
  Typography,
  Tooltip,
  CircularProgress,
  Box,
  Chip,
  Switch,
} from "@mui/material";
import { useFreeze, /* useFreezeRestore */ useIsFrozen } from "src/lib";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import { getTransactionLink } from "src/utils/getTransactionLink";

export default function FreezeDao() {
  const theme = useTheme();

  const { isFrozen } = useIsFrozen();

  const [transactionState, setTransactionState] = useState("");

  const { freeze, freezeData, freezeStatus } = useFreeze();
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

  function handleStatusChange() {
    if (isFrozen) {
      //   defreeze?.();
      return;
    }

    freeze?.();
  }

  function handleSnackbarClose() {
    setTransactionState("");
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
          <Grid item sm={2}>
            {isFrozen ? (
              <Chip label="FROZEN" color="error" style={{ color: "white" }} />
            ) : (
              <Chip label="ACTIVE" color="success" style={{ color: "white" }} />
            )}
          </Grid>
          <Grid item>
            {isVerifing ? (
              <Box marginRight={2}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <Tooltip title={isFrozen ? "Activate DAO" : "Freeze DAO"}>
                <Switch
                  checked={isFrozen}
                  onChange={handleStatusChange}
                  disabled={isFrozen}
                />
              </Tooltip>
            )}
          </Grid>
        </>
      </Grid>

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
