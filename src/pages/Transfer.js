import { Container, Typography } from "@mui/material";
import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import Page from "../components/Page";
import { useTransfer } from "src/lib";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import { useState } from "react";

export default function Transfer() {
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
      await transfer({
        ...transferData,
        onSuccess: () => handleTransactionSuccess(resetForm),
        onError: handleTransactionFailure,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Page title="Dashboard: Token transfer">
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Transfer tokens
        </Typography>

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
