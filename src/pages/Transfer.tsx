import { useState, useEffect, type FC } from "react";
import { Container } from "@mui/material";

import { useTransfer } from "src/lib";
import { useRouterContext, useDebounce } from "src/hooks";
import { getTransactionLink } from "src/utils/getTransactionLink";

import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import PageTitle from "src/sections/common/page-title/PageTitle";
import Page from "src/components/Page";

type IProps = {
  sectionTitle: string;
};

const Transfer: FC<IProps> = ({ sectionTitle }) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState<string | number>("");

  const debouncedTo = useDebounce(to);
  const debouncedAmount = useDebounce(amount);

  const { balance, refetchBalance } = useRouterContext();
  const { transfer, transferData, transferStatus } = useTransfer({
    address: debouncedTo,
    amount: debouncedAmount,
  });
  const [transactionState, setTransactionState] = useState("");

  const isVerifying = transferStatus === "loading";

  useEffect(() => {
    if (transferStatus === "error") {
      setTransactionState("error");
    }

    if (transferStatus === "loading") {
      setTransactionState("info");
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

  function handleFormStateChange(formState: {
    to: string;
    amount: string | number;
  }) {
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
          column
          maxAmountButton
          formState={{ to, amount }}
          onSubmit={handleTransfer}
          onChange={handleFormStateChange}
          loading={transferStatus === "loading" || isVerifying}
          buttonProps={{
            title: "Transfer",
            variant: "contained",
            tooltipText: "Insufficient funds",
            disabled: balance < amount,
          }}
        />
      </Container>

      {(!!transactionState || isVerifying) && (
        <TransactionSnackbar
          variant={transactionState}
          onClose={handleSnackbarClose}
          message={isVerifying ? "The transaction is being verified!" : ""}
          duration={isVerifying ? null : 3000}
          loading={isVerifying}
          etherscanLink={getTransactionLink(transferData?.hash)}
        />
      )}
    </Page>
  );
};

export default Transfer;
