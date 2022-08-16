import { Button, Container, Grid, Typography, Box } from "@mui/material";
import Page from "../components/Page";
import { useState } from "react";
import { erc20Options } from "src/abis";
import { useMoralis } from "react-moralis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";
import AirdropTable from "src/sections/airdrop/table/Table";
import Form from "src/sections/airdrop/form/Form";
import CSVLoader from "src/sections/airdrop/csv-loader/CsvLoader";

export default function Airdrop() {
  const { Moralis, account } = useMoralis();

  const [airdropAddresses, setAirdropAddresses] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState([]);

  function handleAddressAdd(address) {
    setAirdropAddresses((prevAddresses) => [...prevAddresses, address]);
  }

  function handleAddressSelection(addresses) {
    setSelectedAddresses(addresses);
  }

  function handleCSVFileLoad(addresses) {
    setAirdropAddresses(addresses);
  }

  function handleCSVFileRemove() {
    setAirdropAddresses([]);
  }

  function handleRemoveRows(selectedAddresses) {
    setAirdropAddresses((addresses) =>
      addresses.filter(({ address }) => !selectedAddresses.includes(address))
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
        <Grid container wrap="nowrap" justifyContent="space-between">
          <Box width="80%">
            <Typography variant="h3" sx={{ mb: 5 }}>
              Create Airdrop
            </Typography>
          </Box>

          <Box paddingTop={1}>
            <CSVLoader
              onFileLoad={handleCSVFileLoad}
              onFileRemove={handleCSVFileRemove}
              removeFileCondition={!airdropAddresses.length} //  in case user deletes all accounts from table we remove the file
            />
          </Box>
        </Grid>

        <Form onSubmit={handleAddressAdd} />

        {!!airdropAddresses.length && (
          <AirdropTable
            rows={airdropAddresses}
            onSelectChange={handleAddressSelection}
            onRowsDelete={handleRemoveRows}
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
