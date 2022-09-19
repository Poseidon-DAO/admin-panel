import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import Page from "../components/Page";
import { useTransfer } from "src/lib";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";

export default function Transfer() {
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
    try {
      await transfer({
        ...transferData,
        onSuccess: (transaction) =>
          handleTransactionSuccess(transaction, resetForm),
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
