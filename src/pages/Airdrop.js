import {
  Button,
  Container,
  Grid,
  TextField,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material";
import Page from "../components/Page";
import Iconify from "src/components/Iconify";
import { useState } from "react";
import { formatAddress } from "src/utils/formatAddress";
import { erc20Options } from "src/abis";
import { useMoralis } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";
import AirdropTable from "src/components/AirdropTable";

export default function Airdrop() {
  const { Moralis, account } = useMoralis();

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({
    address: "",
    amount: "",
  });

  const [selectedAddresses, setSelectedAddresses] = useState([]);

  const handleInputChange =
    (setter, asNumber = false) =>
    (event) => {
      setter(asNumber ? event.target.valueAsNumber : event.target.value);
      setErrors((errors) => ({
        ...errors,
        [event.target.name]: "",
      }));
    };

  function handleAddressAdd(e, address, amount) {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;

    setSelectedAddresses((prevAddresses) => [
      ...prevAddresses,
      { address, amount },
    ]);
    setAddress("");
    setAmount("");
  }

  function handleAddressRemove(address) {
    setSelectedAddresses((selectedAddresses) =>
      selectedAddresses.filter(
        (selectedAddress) => address !== selectedAddress.address
      )
    );
  }

  function validate() {
    if (!amount || (!selectedAddresses.length && !address)) {
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

  async function handleAirdrop() {
    const options = erc20Options(
      account,
      SMART_CONTRACT_FUNCTIONS.RUN_AIR_DROP,
      {
        _addresses: selectedAddresses.map((address) => address.address),
        _amounts: selectedAddresses.map((address) => address.amount),
        _decimals: 18,
      }
    );

    const res = await Moralis.executeFunction(options);
    console.log({ res });
    return res;
  }

  return (
    <Page title="Dashboard: Token">
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Create Airdrop
        </Typography>

        <form
          onSubmit={(e) => handleAddressAdd(e, address, amount)}
          style={{ height: 79 }}
        >
          <Grid container justifyContent="space-between">
            <Grid item sm={9}>
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
                placeholder="E.g. 5"
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
              <Button variant="outlined" size="large" type="submit">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid container marginTop={2} width="100%">
          {selectedAddresses.map(({ address, amount }, i) => (
            <Grid item key={`${i}-${address}`}>
              <Chip
                label={
                  <Grid container alignItems="center">
                    <Tooltip title={address}>
                      <Typography marginRight={1}>
                        {formatAddress(address)}
                      </Typography>
                    </Tooltip>
                    <Iconify icon="bi:coin" width={12} height={12} />
                    <Tooltip title={amount}>
                      <Typography marginLeft={1}>
                        {amount.toFixed(4)}
                      </Typography>
                    </Tooltip>
                  </Grid>
                }
                onDelete={() => handleAddressRemove(address)}
                variant="outlined"
                style={{ marginRight: 5, marginBottom: 5 }}
              />
            </Grid>
          ))}
        </Grid>

        {!!selectedAddresses.length && (
          <Button
            variant="contained"
            size="large"
            type="submit"
            color="error"
            style={{ marginTop: 30, width: "100%" }}
            onClick={handleAirdrop}
          >
            Finish Airdrop
          </Button>
        )}

        <AirdropTable />
      </Container>
    </Page>
  );
}
