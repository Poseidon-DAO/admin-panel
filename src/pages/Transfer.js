import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import Page from "../components/Page";
import { useState } from "react";
import { erc20Options } from "src/abis";
import { useMoralis } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

export default function Transfer() {
  const { Moralis, account } = useMoralis();

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({
    address: "",
    amount: "",
  });

  const handleInputChange =
    (setter, asNumber = false) =>
    (event) => {
      setter(asNumber ? event.target.valueAsNumber : event.target.value);
      setErrors((errors) => ({
        ...errors,
        [event.target.name]: "",
      }));
    };

  function validate() {
    if (!amount || !address) {
      setErrors({
        ...(!amount && {
          amount: "Please provide an amount!",
        }),
        ...(!address && {
          address: "Please provide a valid Address!",
        }),
      });

      return false;
    }

    return true;
  }

  async function handleAirdrop(e) {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;

    const options = erc20Options(account, SMART_CONTRACT_FUNCTIONS.TRANSFER, {
      to: address,
      amount: Moralis.Units.Token(amount, 18),
    });

    const res = await Moralis.executeFunction(options);
    console.log({ res });
    setAddress("");
    setAmount("");
    return res;
  }

  return (
    <Page title="Dashboard: Token transfer">
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Transfer tokens
        </Typography>

        <form onSubmit={handleAirdrop} style={{ height: 79 }}>
          <Grid container justifyContent="space-between">
            <Grid item style={{ width: "72%" }}>
              <TextField
                name="address"
                value={address}
                onChange={handleInputChange(setAddress)}
                placeholder="E.g. 0x850EdEfE0A1d573057a695B870Ada74116F8E3d0"
                label="Address"
                autoComplete="off"
                InputLabelProps={{ shrink: true }}
                error={!!errors["address"]}
                helperText={errors["address"]}
                style={{ width: "100%" }}
              />
            </Grid>

            <Grid item sm={2}>
              <TextField
                name="amount"
                value={amount}
                onChange={handleInputChange(setAmount, true)}
                placeholder="E.g. 0.005"
                label="Amount"
                type="number"
                autoComplete="off"
                InputLabelProps={{ shrink: true }}
                error={!!errors["amount"]}
                helperText={errors["amount"]}
                style={{ width: "100%" }}
              />
            </Grid>

            <Grid
              item
              container
              width="auto"
              alignItems="center"
              justifyContent="center"
              height={56}
            >
              <Button variant="contained" size="large" type="submit">
                Transfer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Page>
  );
}
