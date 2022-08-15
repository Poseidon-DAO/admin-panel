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

  const [airdropAddresses, setAirdropAddresses] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState([]);

  function handleAddressAdd(address) {
    setAirdropAddresses((prevAddresses) => [...prevAddresses, address]);
  }

  function handleAddressSelection(addresses) {
    setSelectedAddresses((prevAddresses) => [...prevAddresses, ...addresses]);
  }

  function handleAddressRemove(address) {
    setSelectedAddresses((selectedAddresses) =>
      selectedAddresses.filter(
        (selectedAddress) => address !== selectedAddress.address
      )
    );
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

        <Form onSubmit={handleAddressAdd} />

        {!!airdropAddresses.length && (
          <AirdropTable
            rows={airdropAddresses}
            onSelectChange={handleAddressSelection}
          />
        )}

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
