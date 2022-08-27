import { useState } from "react";
import { Grid, TextField, Button, Tooltip } from "@mui/material";

function TransactionForm({
  onSubmit,
  buttonProps,
  resetOnSubmit = false,
  column = false,
  maxAmountButton = false,
}) {
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
      <Grid
        container
        direction={column ? "column" : "row"}
        spacing={2}
        wrap="nowrap"
      >
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
            placeholder="7"
            label="Amount"
            type="number"
            autoComplete="off"
            InputLabelProps={{ shrink: true }}
            error={!!errors["amount"]}
            helperText={errors["amount"]}
            style={{ width: "100%" }}
            InputProps={{
              endAdornment: maxAmountButton && !amount && (
                <Tooltip
                  title="Use the max amount of tokens you have"
                  placement="top"
                >
                  <Button variant="text" size="medium">
                    Max
                  </Button>
                </Tooltip>
              ),
            }}
          />
        </Grid>

        <Grid item xs container justifyContent="flex-end">
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

export default TransactionForm;
