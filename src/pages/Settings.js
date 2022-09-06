import { useState } from "react";
import { Container } from "@mui/material";

import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import Page from "src/components/Page";
import SettingsLayout from "src/layouts/settings";
import PageTitle from "src/sections/common/page-title/PageTitle";

export default function Settings({ sectionTitle }) {
  const [transactionState, setTransactionState] = useState("");

  function handleSnackbarClose() {
    setTransactionState("");
  }

  return (
    <Page title="Settings">
      <Container maxWidth="xl">
        <PageTitle>{sectionTitle}</PageTitle>

        <SettingsLayout />
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
