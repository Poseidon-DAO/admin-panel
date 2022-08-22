import { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

function Form({ onSubmit, buttonProps, resetOnSubmit = false }) {
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

    if (resetOnSubmit) {
      setAddress("");
      setAmount("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} wrap="nowrap">
        <Grid item xs={9}>
          <TextField
            name="address"
            value={address}
            onChange={handleInputChange(setAddress)}
            placeholder="0x850EdEfE0A1d573057a695B870Ada74116F8E3d0"
            label="Address"
            autoComplete="off"
            InputLabelProps={{ shrink: true }}
            error={!!errors["address"]}
            helperText={errors["address"]}
            style={{ width: "100%" }}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            name="amount"
            value={amount}
            onChange={handleInputChange(setAmount, true)}
            placeholder="0.5"
            label="Amount"
            type="number"
            autoComplete="off"
            InputLabelProps={{ shrink: true }}
            error={!!errors["amount"]}
            helperText={errors["amount"]}
            style={{ width: "100%" }}
          />
        </Grid>

        <Grid item xs>
          <Button
            variant="outlined"
            size="large"
            type="submit"
            style={{ marginTop: 4 }}
            {...buttonProps}
          >
            {buttonProps?.title || "Add"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;
