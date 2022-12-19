import { Button, Grid, TextField, IconButton } from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import Web3 from "web3";

export default function SearchInput({ address, onChange, onClick, onDelete }) {
  const [error, setError] = useState("");

  function isValid() {
    const isEmpty = !address;
    const isValid = Web3.utils.isAddress(address);

    if (!isValid) {
      setError("Please provide a valid address!");
    }

    if (isEmpty) {
      setError("Please provide an address!");
    }

    return isValid;
  }

  function handleChange(e) {
    setError("");
    onChange?.(e);
  }

  function handleDelete() {
    setError("");
    onDelete?.();
  }

  function handleClick() {
    if (!isValid()) return;

    onClick?.();
  }

  return (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <TextField
          fullWidth
          name="address"
          value={address}
          placeholder="0x850EdEfE0A1d573057a695B870Ada74116F8E3d0"
          label="Address"
          autoComplete="off"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          InputProps={{
            endAdornment: address && (
              <IconButton variant="text" size="medium" onClick={handleDelete}>
                <Iconify icon="charm:cross" />
              </IconButton>
            ),
          }}
          error={!!error}
          helperText={error}
        />
      </Grid>

      <Grid item marginTop="4px">
        <Button variant="contained" size="large" onClick={handleClick}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
