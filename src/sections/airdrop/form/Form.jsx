import { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

function Form({ onSubmit }) {
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

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    onSubmit?.({ address, amount });

    setAddress("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ height: 79 }}>
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
  );
}

export default Form;
