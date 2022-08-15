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
import AirdropTable from "src/sections/airdrop/table/Table";
import Form from "src/sections/airdrop/form/Form";

export default function Airdrop() {
  const { Moralis, account } = useMoralis();

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({
    address: "",
    amount: "",
  });

  const [airdropAddresses, setAirdropAddresses] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState([]);

  const handleInputChange = (event) => {
    console.log({ event });

    // setter(asNumber ? event.target.valueAsNumber : event.target.value);
    // setErrors((errors) => ({
    //   ...errors,
    //   [event.target.name]: "",
    // }));
  };

  function handleAddressAdd(e, address, amount) {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;

    setAirdropAddresses((airdropAddresses) => [
      ...airdropAddresses,
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

    try {
      await Moralis.executeFunction(options);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Page title="Dashboard: Token">
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Create Airdrop
        </Typography>

        <Form
          onSubmit={(e) => handleAddressAdd(e, address, amount)}
          onChange={handleInputChange}
          address={address}
          amount={amount}
          errors={errors}
        />

        {console.log({ selectedAddresses, airdropAddresses })}

        {!!airdropAddresses.length && <AirdropTable rows={airdropAddresses} />}

        {!!airdropAddresses.length && (
          <Button
            variant="contained"
            size="large"
            color="error"
            style={{ marginTop: 30, width: "100%" }}
            onClick={handleAirdrop}
          >
            Finish Airdrop
          </Button>
        )}
      </Container>
    </Page>
  );
}
