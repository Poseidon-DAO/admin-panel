import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Container } from "@mui/material";

import { useTransfer } from "src/lib";
import { useDebounce } from "src/hooks/useDebounce";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import PageTitle from "src/sections/common/page-title/PageTitle";

import Page from "../components/Page";

export default function Transfer({ sectionTitle }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const debouncedTo = useDebounce(to);
  const debouncedAmount = useDebounce(amount);

  const { transfer, isFetchingTransfer, transferStatus } = useTransfer({
    address: debouncedTo,
    amount: debouncedAmount,
  });
  const [transactionState, setTransactionState] = useState("");
  const { refetchBalance } = useOutletContext();

  const isVerifying = transferStatus === "loading";

  useEffect(() => {
    if (transferStatus === "error") {
      setTransactionState("error");
    }

    if (transferStatus === "success") {
      refetchBalance();
      setTransactionState("success");
      setTo("");
      setAmount("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferStatus]);

  function handleSnackbarClose() {
    setTransactionState("");
  }

  function handleFormStateChange(formState) {
    setTo(formState.to);
    setAmount(formState.amount);
  }

  function handleTransfer() {
    transfer?.();
  }

  return (
    <Page title="Transfer">
      <Container maxWidth="xl">
        <PageTitle>{sectionTitle}</PageTitle>

        <TransactionForm
          formState={{ to, amount }}
          onSubmit={handleTransfer}
          onChange={handleFormStateChange}
          loading={
            isFetchingTransfer || transferStatus === "loading" || isVerifying
          }
          buttonProps={{ title: "Transfer", variant: "contained" }}
          column
          maxAmountButton
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
