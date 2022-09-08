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

export default function TokenSettings() {
  const {
    fetchAddress,
    address,
    isFetching: isFetchingAddress,
    isLoading: isLoadingAddress,
  } = useERC1155Address();
  const {
    fetchId,
    id,
    isFetching: isFetchingId,
    isLoading: isLoadingId,
  } = useERC1155Id();
  const {
    fetchRatio,
    ratio,
    isFetching: isFetchingRatio,
    isLoading: isLoadingRatio,
  } = useERC1155Ratio();

  const theme = useTheme();
  const [isEditing, setEditing] = useState(false);
  const [localRatio, setLocalRatio] = useState(ratio);

  const { setERC1155, isFetching, isLoading } = useSetERC1155({
    erc1155Address: address,
    ercId: id,
    ratio: localRatio,
  });

  useEffect(() => {
    setLocalRatio(ratio);
  }, [ratio]);

  useEffect(() => {
    fetchAddress();
    fetchId();
    fetchRatio();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEditClick(shouldEdit) {
    setEditing(shouldEdit);
  }

  function handleRatioChange(event) {
    setLocalRatio(event.target.valueAsNumber);
  }

  function handleDecline() {
    setLocalRatio(ratio);
  }

  function handleSave() {
    try {
      setERC1155({
        erc1155Address: address,
        ercId: id,
        ratio: localRatio,
        onSuccess: () => fetchRatio(),
      });
    } catch (err) {
      console.log(err);
    }
  }

  const showSpinner =
    isFetchingAddress ||
    isLoadingAddress ||
    isFetchingId ||
    isLoadingId ||
    isFetchingRatio ||
    isLoadingRatio;

  if (showSpinner) {
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
              <Typography variant="subtitle1">
                Tokens to burn for receiving an NFT
              </Typography>
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
            disabled={isFetching || isLoading}
          >
            Decline
          </Button>

          <LoadingButton
            size="medium"
            variant="contained"
            sx={{ marginLeft: 1 }}
            onClick={handleSave}
            loading={isFetching || isLoading}
            disabled={isFetching || isLoading}
          >
            Save changes
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
}
