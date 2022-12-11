import { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import AirdropTable from "src/sections/airdrop/table/Table";
import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import CSVLoader from "src/sections/airdrop/csv-loader/CSVLoader";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import PageTitle from "src/sections/common/page-title/PageTitle";
import Page from "src/components/Page";

import { useAirdrop } from "src/lib";

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

export default function Airdrop({ sectionTitle }) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const [airdropAddresses, setAirdropAddresses] = useState([]);
  const [transactionState, setTransactionState] = useState("");

  const { runAirdrop, transferStatus } = useAirdrop({
    accounts: airdropAddresses,
  });

  const { refetchBalance } = useOutletContext();

  function handleAddressAdd({ to, amount }) {
    setAirdropAddresses((prevAddresses) => [
      ...prevAddresses,
      { address: to, amount },
    ]);
    setAddress("");
    setAmount("");
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

  useEffect(() => {
    if (transferStatus === "error") {
      setTransactionState("error");
    }

    if (transferStatus === "success") {
      refetchBalance();
      setTransactionState("success");
      setAirdropAddresses([]);
      setAddress("");
      setAmount("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferStatus]);

  function handleSnackbarClose() {
    setTransactionState("");
  }

  function handleFormStateChange(formState) {
    setAddress(formState.to);
    setAmount(formState.amount);
  }

  function handleAirdrop() {
    runAirdrop?.();
  }

  const isVerifying = transferStatus === "loading";

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
              disabled={transferStatus === "loading" || isVerifying}
            />
          </Box>
        </Grid>

        <TransactionForm
          formState={{ to: address, amount }}
          onChange={handleFormStateChange}
          onSubmit={handleAddressAdd}
          loading={transferStatus === "loading" || isVerifying}
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
            loading={transferStatus === "loading" || isVerifying}
            disabled={isVerifying}
            onClick={handleAirdrop}
          >
            Run Airdrop
          </LoadingButton>
        )}
      </Container>

      {(!!transactionState || isVerifying) && (
        <TransactionSnackbar
          variant={variant[transactionState || "verifying"]}
          onClose={handleSnackbarClose}
          message={messages[transactionState || "verifying"]}
          duration={isVerifying ? 20 * 1000 : 3000}
        />
      )}
    </Page>
  );
}
