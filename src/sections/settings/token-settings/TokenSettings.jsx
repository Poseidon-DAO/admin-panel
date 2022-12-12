import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  useTheme,
  TextField,
  Tooltip,
  CircularProgress,
  Button,
} from "@mui/material";
import Iconify from "src/components/Iconify";
import {
  useERC1155Address,
  useERC1155Id,
  useERC1155Ratio,
  useSetERC1155,
} from "src/lib";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";

export default function TokenSettings() {
  const theme = useTheme();

  const { ratio } = useERC1155Ratio();
  const { address } = useERC1155Address();
  const { id } = useERC1155Id();

  const [isEditing, setEditing] = useState(false);
  const [localRatio, setLocalRatio] = useState(ratio);
  const [transactionState, setTransactionState] = useState("");

  const { setERC1155, setERC1155Status } = useSetERC1155({
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

  function handleEditClick(shouldEdit) {
    setEditing(shouldEdit);
  }

  function handleRatioChange(event) {
    setLocalRatio(event.target.valueAsNumber);
  }

  function handleDecline() {
    setLocalRatio(ratio);
  }

  function handleSnackbarClose() {
    setTransactionState("");
  }

  async function handleSave() {
    setERC1155();
    handleEditClick(false);
  }

  if (setERC1155Status === "loading") {
    return (
      <Box textAlign="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box ml={5}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
        color={theme.palette.grey["600"]}
        sx={{ borderWidth: "1px 0 1px 0", minHeight: 98 }}
        border={`1px solid ${theme.palette.divider}`}
        py={3}
        px={2}
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
            <Grid item>
              <Tooltip title="Save">
                <IconButton onClick={() => handleEditClick(false)}>
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
            <Grid item>
              <Tooltip title="Edit">
                <IconButton onClick={() => handleEditClick(true)}>
                  <Iconify icon="clarity:edit-line" />
                </IconButton>
              </Tooltip>
            </Grid>
          </>
        )}
      </Grid>

      {ratio !== localRatio && !isEditing && (
        <Box textAlign="right" mt={2}>
          <Button
            size="medium"
            variant="outlined"
            color="error"
            onClick={handleDecline}
            disabled={setERC1155Status === "loading"}
          >
            Decline
          </Button>

          <LoadingButton
            size="medium"
            variant="contained"
            sx={{ marginLeft: 1 }}
            onClick={handleSave}
            loading={setERC1155Status === "loading"}
            disabled={setERC1155Status === "loading"}
          >
            Save changes
          </LoadingButton>
        </Box>
      )}

      {!!transactionState && (
        <TransactionSnackbar
          message={
            setERC1155Status === "loading" &&
            "The transaction is being verified!"
          }
          variant={transactionState}
          onClose={handleSnackbarClose}
          loading={setERC1155Status === "loading"}
          duration={setERC1155Status === "loading" ? null : 3000}
        />
      )}
    </Box>
  );
}
