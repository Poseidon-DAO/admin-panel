import { useState } from "react";
import { Grid, TextField, Button, Tooltip } from "@mui/material";
import web3 from "web3";
import { useOutletContext } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

TransactionForm.defaultProps = {
  resetOnSubmit: false,
  column: false,
  maxAmountButton: false,
  loading: false,
  buttonProps: {
    title: "",
  },
};

function TransactionForm({
  onSubmit,
  buttonProps,
  resetOnSubmit,
  column,
  maxAmountButton,
  loading,
}) {
  const { balance } = useOutletContext();

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
        ...(!address && {
          address: "Please provide an address!",
        }),
        ...(!amount && {
          amount: "Please provide an amount!",
        }),
      });

      return false;
    }

    if (!web3.utils.isAddress(address)) {
      setErrors({
        ...errors,
        address: "Please provide a valid address!",
      });

      return false;
    }

    return true;
  }

  function reset() {
    setAddress("");
    setAmount("");
  }

  function handleMaxValueSet() {
    setAmount(balance);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    onSubmit?.({ address, amount }, reset);

    if (resetOnSubmit) {
      reset();
    }
  }

  function renderSubmitButton({ element, showTooltip }) {
    if (!showTooltip) return element;

    return (
      <Tooltip title="Insufficient funds">
        <span>{element}</span>
      </Tooltip>
    );
  }

  const { title, ...allButtonProps } = buttonProps;

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
            disabled={loading}
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

        <Grid item xs={3}>
          <TextField
            name="amount"
            value={amount}
            disabled={loading}
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
                  <Button
                    variant="text"
                    size="medium"
                    onClick={handleMaxValueSet}
                  >
                    Max
                  </Button>
                </Tooltip>
              ),
            }}
          />
        </Grid>

        <Grid item xs container justifyContent="flex-end">
          {renderSubmitButton({
            element: (
              <LoadingButton
                variant="outlined"
                size="large"
                type="submit"
                style={{ marginTop: 4 }}
                disabled={amount > balance}
                loading={loading}
                {...allButtonProps}
              >
                {title || "Add"}
              </LoadingButton>
            ),
            showTooltip: balance < amount,
          })}
        </Grid>
      </Grid>
    </form>
  );
}

export default TransactionForm;
