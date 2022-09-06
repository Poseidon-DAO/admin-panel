import { useState } from "react";
import { Container } from "@mui/material";

import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import Page from "src/components/Page";
import { useTransfer } from "src/lib";
import PageTitle from "src/sections/common/page-title/PageTitle";

export default function Transfer({ sectionTitle }) {
  const { transfer, isFetching, isLoading } = useTransfer();
  const [transactionState, setTransactionState] = useState("");

  function handleSnackbarClose() {
    setTransactionState("");
  }

  function handleTransactionSuccess(resetForm) {
    setTransactionState("success");
    resetForm();
  }

  function handleTransactionFailure() {
    setTransactionState("error");
  }

  async function handleTransfer(transferData, resetForm) {
    try {
      transfer({
        ...transferData,
        onSuccess: () => handleTransactionSuccess(resetForm),
        onError: handleTransactionFailure,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Page title="Transfer">
      <Container maxWidth="xl">
        <PageTitle>{sectionTitle}</PageTitle>

        <TransactionForm
          column
          maxAmountButton
          onSubmit={handleTransfer}
          loading={isFetching || isLoading}
          buttonProps={{ title: "Transfer", variant: "contained" }}
        />
      </Container>

      {!!transactionState && (
        <TransactionSnackbar
          variant={transactionState}
          onClose={handleSnackbarClose}
        />
      )}
    </Page>
  );
}
