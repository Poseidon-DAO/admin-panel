import { Container, Typography } from "@mui/material";
import { erc20Options } from "src/abis";
import { useMoralis } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";
import Form from "src/sections/airdrop/form/Form";
import Page from "../components/Page";
import { useEffect, useState } from "react";

export default function Transfer() {
  const { Moralis, account, user } = useMoralis();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    getBalance();
  }, []);

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

  async function getBalance() {
    try {
      const res = await Moralis.Web3API.account.getNativeBalance({
        chain: process.env.REACT_APP_CHAIN,
        account: user.get("ethAddress"),
      });

      setBalance(Moralis.Units.FromWei(res.balance));
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

        <Form
          onSubmit={handleTransfer}
          buttonProps={{
            title: "Transfer",
            variant: "contained",
            // disabled: !balance,
          }}
        />
      </Container>
    </Page>
  );
}
