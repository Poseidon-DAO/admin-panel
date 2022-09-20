import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Container } from "@mui/material";

import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import PageTitle from "src/sections/common/page-title/PageTitle";
import Page from "src/components/Page";

import { useTransfer } from "src/lib";

export default function Transfer({ sectionTitle }) {
  const { transfer, isFetching, isLoading } = useTransfer();
  const [transactionState, setTransactionState] = useState("");
  const [isVerifying, setVerifying] = useState(false);
  const { refetchBalance } = useOutletContext();

  function handleSnackbarClose() {
    setTransactionState("");
  }

  async function handleTransactionSuccess(transaction, resetForm) {
    setVerifying(true);
    await transaction.wait();
    refetchBalance();
    setVerifying(false);
    setTransactionState("success");

    resetForm();
  }

  function handleTransactionFailure() {
    setTransactionState("error");
  }

  async function handleTransfer(transferData, resetForm) {
    transfer({
      ...transferData,
      onSuccess: (transaction) =>
        handleTransactionSuccess(transaction, resetForm),
      onError: handleTransactionFailure,
    });
  }

  return (
    <Page title="Transfer">
      <Container maxWidth="xl">
        <PageTitle>{sectionTitle}</PageTitle>

        <TransactionForm
          column
          maxAmountButton
          onSubmit={handleTransfer}
          loading={isFetching || isLoading || isVerifying}
          buttonProps={{ title: "Transfer", variant: "contained" }}
        />
      </Container>

      {(!!transactionState || isVerifying) && (
        <TransactionSnackbar
          variant={transactionState || "info"}
          onClose={handleSnackbarClose}
          message={isVerifying ? "Verifying transaction...." : ""}
          duration={isVerifying ? 20 * 1000 : 3000}
        />
      )}
    </Page>
  );
}
