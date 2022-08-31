import { useState } from "react";
import { Container, Typography } from "@mui/material";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";

import Page from "../components/Page";

export default function Settings() {
  const [transactionState, setTransactionState] = useState("");

  function handleSnackbarClose() {
    setTransactionState("");
  }

  return (
    <Page title="Settings">
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Settings
        </Typography>
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
