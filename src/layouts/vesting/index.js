import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useVestLength, useVestsMetadata } from "src/lib";
import SearchInput from "src/sections/vesting/search-input/SearchInput";
import VestingTable from "src/sections/vesting/vesting-table/VestingTable";

export default function VestingLayout() {
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [address, setAddress] = useState("");

  const { vestLength } = useVestLength({ address, enabled: shouldSubmit });
  const { vestsMetadata } = useVestsMetadata({
    vestLength,
    address,
    enabled: shouldSubmit,
  });

  useEffect(() => {
    if (!address) {
      setShouldSubmit(false);
    }
  }, [address]);

  function handleInputChange(e) {
    setAddress(e.target.value);
  }

  function handleGetVests() {
    setShouldSubmit(true);
  }

  function handleDeleteVests(selectedVests) {
    console.log("hini", selectedVests);
  }

  const rows = vestsMetadata.map((metadata) => ({
    ...metadata,
    address,
  }));

  return (
    <Box>
      <SearchInput
        address={address}
        onChange={handleInputChange}
        onClick={handleGetVests}
      />

      {!shouldSubmit && (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <Typography variant="h5" maxWidth="450px" textAlign="center">
            Please provide an address, in order to get the data about vesting
            related to the address
          </Typography>
        </Grid>
      )}

      {!!vestsMetadata.length && shouldSubmit && (
        <VestingTable rows={rows} onRowsDelete={handleDeleteVests} />
      )}
    </Box>
  );
}
