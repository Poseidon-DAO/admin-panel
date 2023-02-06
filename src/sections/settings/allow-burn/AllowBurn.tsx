import { useState, useEffect, ChangeEvent } from "react";
import {
  Grid,
  Typography,
  useTheme,
  CircularProgress,
  Box,
  Chip,
  Switch,
} from "@mui/material";
import { useBurnAllowance, useIsAllowedToBurn } from "src/lib/chain";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import { getTransactionLink } from "src/utils/getTransactionLink";

export default function AllowBurn() {
  const theme = useTheme();

  const { isAllowedToBurn } = useIsAllowedToBurn();
  const [localIsAllowedToBurn, setLocalIsAllowedToBurn] =
    useState(isAllowedToBurn);

  const {
    setBurnAllowance,
    setBurnAllowanceData,
    setBurnAllowanceStatus,
    setBurnAllowanceWriteStatus,
  } = useBurnAllowance({
    allow: !!localIsAllowedToBurn,
  });

  useEffect(() => {
    if (isAllowedToBurn !== localIsAllowedToBurn) {
      setBurnAllowance?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localIsAllowedToBurn, isAllowedToBurn]);

  useEffect(() => {
    if (setBurnAllowanceWriteStatus === "error") {
      setLocalIsAllowedToBurn(isAllowedToBurn);
    }
  }, [setBurnAllowanceWriteStatus, isAllowedToBurn]);

  function handleAllowBurnChange(event: ChangeEvent<HTMLInputElement>) {
    setLocalIsAllowedToBurn(event.target.checked);
  }

  const isConnectingToMetamask = setBurnAllowanceWriteStatus === "loading";

  const isVerifying = setBurnAllowanceStatus === "loading";
  const showSnackbar = setBurnAllowanceStatus !== "idle";
  const snackbarDuration = isVerifying ? null : 3000;
  const snackbarVariantForState = {
    loading: "info",
    error: "error",
    success: "success",
    idle: "",
  }[setBurnAllowanceStatus];

  const snackbarMessage = isVerifying
    ? "The transaction is being verified!"
    : "";

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
            <Typography variant="subtitle1">Allow burn</Typography>
          </Grid>
          <Grid item sm={2} ml={-8}>
            {!isAllowedToBurn ? (
              <Chip
                label="OFF"
                color="error"
                style={{ color: "white", width: 80 }}
              />
            ) : (
              <Chip
                label="ON"
                color="success"
                style={{ color: "white", width: 80 }}
              />
            )}
          </Grid>
          <Grid container item sm={1} justifyContent="flex-end">
            {isVerifying || isConnectingToMetamask ? (
              <Box marginRight={2}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <Switch
                color="success"
                checked={!!localIsAllowedToBurn}
                onChange={handleAllowBurnChange}
              />
            )}
          </Grid>
        </>
      </Grid>

      {showSnackbar && (
        <TransactionSnackbar
          message={snackbarMessage}
          variant={snackbarVariantForState}
          duration={snackbarDuration}
          etherscanLink={getTransactionLink(setBurnAllowanceData?.hash)}
          loading={isVerifying}
        />
      )}
    </>
  );
}
