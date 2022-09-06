import { Container, Grid, Box } from "@mui/material";
import Page from "../components/Page";
import { useState } from "react";
import AirdropTable from "src/sections/airdrop/table/Table";
import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import CSVLoader from "src/sections/airdrop/csv-loader/CSVLoader";
import { useAirdrop } from "src/lib";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import { LoadingButton } from "@mui/lab";
import PageTitle from "src/sections/common/page-title/PageTitle";

const variant = {
  error: "error",
  fileError: "error",
  success: "success",
};

export default function Airdrop({ sectionTitle }) {
  const { runAirdrop, isFetching, isLoading } = useAirdrop();

  const [airdropAddresses, setAirdropAddresses] = useState([]);
  const [transactionState, setTransactionState] = useState("");

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

  function handleTransactionSuccess() {
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
      runAirdrop({
        addresses: airdropAddresses,
        onSuccess: handleTransactionSuccess,
        onError: handleTransactionFailure,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Page title="Airdrop">
      <Container maxWidth="xl">
        <Grid container wrap="nowrap" justifyContent="space-between">
          <Box width="80%">
            <PageTitle>{sectionTitle}</PageTitle>
          </Box>

          <Box paddingTop={1}>
            <CSVLoader
              onFileLoad={handleCSVFileLoad}
              onFileRemove={handleCSVFileRemove}
              removeFileCondition={!airdropAddresses.length} //  in case user deletes all accounts from table we remove the file
            />
          </Box>
        </Grid>

        <TransactionForm
          onSubmit={handleAddressAdd}
          loading={isFetching || isLoading}
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
            loading={isFetching || isLoading}
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
          message={
            transactionState === "fileError" ? "Wrong data format on file!" : ""
          }
        />
      )}
    </Page>
  );
}
