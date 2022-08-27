import { Container, Typography } from "@mui/material";
import { erc20Options } from "src/abis";
import { useMoralis } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";
import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import Page from "../components/Page";
import { useOutletContext } from "react-router-dom";

export default function Transfer() {
  const { balance } = useOutletContext();
  const { Moralis, account } = useMoralis();

  async function handleTransfer({ address, amount }) {
    const options = erc20Options(account, SMART_CONTRACT_FUNCTIONS.TRANSFER, {
      to: address,
      amount: Moralis.Units.Token(amount, 18),
    });

    try {
      await Moralis.executeFunction(options);
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
          buttonProps={{
            title: "Transfer",
            variant: "contained",
            // disabled: balance < 10,
          }}
        />
      </Container>
    </Page>
  );
}
