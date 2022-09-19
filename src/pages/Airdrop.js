import { Container, Grid, Typography, Box } from "@mui/material";
import Page from "../components/Page";
import { useState } from "react";
import AirdropTable from "src/sections/airdrop/table/Table";
import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import CSVLoader from "src/sections/airdrop/csv-loader/CSVLoader";
import { useAirdrop } from "src/lib";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import { LoadingButton } from "@mui/lab";
import { useOutletContext } from "react-router-dom";

const variant = {
  error: "error",
  fileError: "error",
  success: "success",
  verifying: "info",
};

const messages = {
  fileError: "Wrong data format on file!",
  verifying: "Verifying transaction...",
};

export default function Airdrop() {
  const { runAirdrop, isFetching, isLoading } = useAirdrop();

  const [airdropAddresses, setAirdropAddresses] = useState([]);
  const [transactionState, setTransactionState] = useState("");

  const { refetchBalance } = useOutletContext();

  function handleAddressAdd(address) {
    setAirdropAddresses((prevAddresses) => [...prevAddresses, address]);
  }

  function handleCSVFileLoad(addresses, error) {
    if (!!error) {
      setTransactionState("fileError");
      return;
    }
    setAirdropAddresses(addresses);
  }

  function handleCSVFileRemove() {
    setAirdropAddresses([]);
  }

  function handleRemoveRows(selected) {
    setAirdropAddresses((addresses) =>
      addresses.filter(({ address }) => !selected.includes(address))
    );
  }

  async function handleTransactionSuccess(transaction) {
    setTransactionState("verifying");
    await transaction.wait();
    refetchBalance();
    setTransactionState("success");
    setAirdropAddresses([]);
  }

  function handleTransactionFailure() {
    setTransactionState("error");
  }

  function handleSnackbarClose() {
    setTransactionState("");
  }

  async function handleAirdrop() {
    try {
      await runAirdrop({
        addresses: airdropAddresses,
        onSuccess: handleTransactionSuccess,
        onError: handleTransactionFailure,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const isVerifying = transactionState === "verifying";

  return (
    <Page title="Dashboard: Token">
      <Container>
        <Grid container wrap="nowrap" justifyContent="space-between">
          <Box width="80%">
            <Typography variant="h3" sx={{ mb: 5 }}>
              Create Airdrop
            </Typography>
          </Box>

          <Box paddingTop={1}>
            <CSVLoader
              onFileLoad={handleCSVFileLoad}
              onFileRemove={handleCSVFileRemove}
              removeFileCondition={!airdropAddresses.length} //  in case user deletes all accounts from table we remove the file
              disabled={isVerifying || isLoading || isFetching}
            />
          </Box>
        </Grid>

        <TransactionForm
          onSubmit={handleAddressAdd}
          loading={isFetching || isLoading || isVerifying}
          resetOnSubmit
        />

        {!!airdropAddresses.length && (
          <AirdropTable
            rows={airdropAddresses}
            onRowsDelete={handleRemoveRows}
          />
        )}

        {!!airdropAddresses.length && (
          <LoadingButton
            variant="contained"
            size="large"
            color="success"
            style={{ marginTop: 30, width: "100%", color: "white" }}
            loading={isFetching || isLoading || isVerifying}
            disabled={isVerifying}
            onClick={handleAirdrop}
          >
            Run Airdrop
          </LoadingButton>
        )}
      </Container>

      {!!transactionState && (
        <TransactionSnackbar
          variant={variant[transactionState]}
          onClose={handleSnackbarClose}
          message={messages[transactionState]}
          duration={isVerifying ? 20 * 1000 : 3000}
        />
      )}
    </Page>
  );
}
