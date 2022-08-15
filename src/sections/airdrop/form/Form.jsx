import { Grid, TextField, Button } from "@mui/material";

function Form({ onSubmit, onChange, address, amount, errors }) {
  return (
    <form onSubmit={() => onSubmit?.()} style={{ height: 79 }}>
      <Grid container justifyContent="space-between">
        <Grid item sm={9}>
          <TextField
            name="address"
            value={address}
            onChange={onChange}
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
            onChange={onChange}
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
  );
}

export default Form;
