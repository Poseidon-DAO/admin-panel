import { Button, Grid, TextField, IconButton } from "@mui/material";
import Iconify from "src/components/Iconify";

export default function SearchInput({ address, onChange, onClick }) {
  function handleClearValue() {
    onChange({ target: { value: "" } });
  }

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item sm={4}>
        <TextField
          fullWidth
          name="address"
          value={address}
          placeholder="0x850EdEfE0A1d573057a695B870Ada74116F8E3d0"
          label="Address"
          autoComplete="off"
          InputLabelProps={{ shrink: true }}
          onChange={onChange}
          InputProps={{
            endAdornment: address && (
              <IconButton
                variant="text"
                size="medium"
                onClick={handleClearValue}
              >
                <Iconify icon="charm:cross" />
              </IconButton>
            ),
          }}
        />
      </Grid>

      <Grid item>
        <Button variant="contained" size="large" onClick={onClick}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
