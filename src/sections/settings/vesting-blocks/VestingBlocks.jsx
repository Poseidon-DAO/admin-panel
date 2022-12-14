import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  useTheme,
  TextField,
  Tooltip,
  CircularProgress,
  Box,
} from "@mui/material";
import Iconify from "src/components/Iconify";
import { useSecurityDelayInBlocks, useSetSecurityDelayInBlocks } from "src/lib";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import { getTransactionLink } from "src/utils/getTransactionLink";

export default function VestingBlocks() {
  const theme = useTheme();

  const { delayInBlocks } = useSecurityDelayInBlocks();

  const [isEditing, setEditing] = useState(false);
  const [localDelay, setLocalDelay] = useState(delayInBlocks);
  const [transactionState, setTransactionState] = useState("");

  const { setDelayInBlocks, delayInBlocksData, delayInBlocksStatus } =
    useSetSecurityDelayInBlocks({ duration: localDelay });

  useEffect(() => {
    setLocalDelay(delayInBlocks);
  }, [delayInBlocks]);

  useEffect(() => {
    if (delayInBlocksStatus === "error") {
      setTransactionState("error");
      setLocalDelay(delayInBlocks);
    }

    if (delayInBlocksStatus === "loading") {
      setTransactionState("info");
    }

    if (delayInBlocksStatus === "success") {
      setTransactionState("success");
    }
  }, [delayInBlocksStatus, delayInBlocks]);

  function handleEditClick() {
    setEditing(true);
  }

  function handleDecline() {
    setEditing(false);
    setLocalDelay(delayInBlocks);
  }

  function handleSave() {
    setEditing(false);
    setDelayInBlocks();
  }

  function handleDelayChange(event) {
    setLocalDelay(event.target.valueAsNumber);
  }

  function handleSnackbarClose() {
    setTransactionState("");
  }

  const isVerifing = delayInBlocksStatus === "loading";

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
        color={theme.palette.grey["600"]}
      >
        {!!isEditing ? (
          <>
            <Grid item sm={12}>
              <TextField
                type="number"
                value={String(localDelay)}
                onChange={handleDelayChange}
                variant="standard"
                label="Vesting blocks"
                sx={{ width: "90%" }}
                autoFocus
              />
            </Grid>
            <Grid
              item
              container
              justifyContent="flex-end"
              alignItems="center"
              flex={1}
              wrap="nowrap"
            >
              <Tooltip title="Decline">
                <IconButton onClick={() => handleDecline()}>
                  <Iconify icon="charm:cross" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Save">
                <IconButton onClick={() => handleSave()}>
                  <Iconify icon="charm:tick" />
                </IconButton>
              </Tooltip>
            </Grid>
          </>
        ) : (
          <>
            <Grid item sm={10}>
              <Typography variant="subtitle1">
                Amount of blocks for vesting
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="subtitle1">{localDelay}</Typography>
            </Grid>
            <Grid container item sm={1} justifyContent="flex-end">
              {isVerifing ? (
                <Box marginRight={2}>
                  <CircularProgress size={20} />
                </Box>
              ) : (
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEditClick()}>
                    <Iconify icon="clarity:edit-line" />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </>
        )}
      </Grid>

      {!!transactionState && (
        <TransactionSnackbar
          message={isVerifing ? "The transaction is being verified!" : null}
          variant={transactionState}
          onClose={handleSnackbarClose}
          duration={isVerifing ? null : 3000}
          etherscanLink={getTransactionLink(delayInBlocksData?.hash)}
          loading={isVerifing}
        />
      )}
    </>
  );
}
