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
import {
  useERC1155Address,
  useERC1155Id,
  useERC1155Ratio,
  useSetERC1155,
} from "src/lib/chain";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import { getTransactionLink } from "src/utils/getTransactionLink";

export default function BurnRatio() {
  const theme = useTheme();

  const { ratio } = useERC1155Ratio();
  const { address } = useERC1155Address();
  const { id } = useERC1155Id();

  const [isEditing, setEditing] = useState(false);
  const [localRatio, setLocalRatio] = useState(ratio);
  const [transactionState, setTransactionState] = useState("");

  const { setERC1155, setERC1155Data, setERC1155Status } = useSetERC1155({
    erc1155Address: address,
    ercId: id,
    ratio: localRatio,
  });

  useEffect(() => {
    setLocalRatio(ratio);
  }, [ratio]);

  useEffect(() => {
    if (setERC1155Status === "error") {
      setTransactionState("error");
    }

    if (setERC1155Status === "loading") {
      setTransactionState("info");
    }

    if (setERC1155Status === "success") {
      setTransactionState("success");
    }
  }, [setERC1155Status]);

  function handleEditClick() {
    setEditing(true);
  }

  function handleDecline() {
    setEditing(false);
    setLocalRatio(ratio);
  }

  function handleSave() {
    setEditing(false);
    setERC1155();
  }

  function handleRatioChange(event) {
    setLocalRatio(event.target.valueAsNumber);
  }

  function handleSnackbarClose() {
    setTransactionState("");
  }

  const isVerifing = setERC1155Status === "loading";

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
                value={String(localRatio)}
                onChange={handleRatioChange}
                variant="standard"
                label="Amount of tokens to burn"
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
              <Typography variant="subtitle1">Burn Ratio</Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="subtitle1">{localRatio}</Typography>
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
          etherscanLink={getTransactionLink(setERC1155Data?.hash)}
          loading={isVerifing}
        />
      )}
    </>
  );
}
