import { useState } from "react";
import { Grid, TextField, Button, Tooltip } from "@mui/material";
import web3 from "web3";
import { useOutletContext } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

TransactionForm.defaultProps = {
  column: false,
  maxAmountButton: false,
  loading: false,
  buttonProps: {
    title: "",
  },
  formState: {
    to: "",
    amount: "",
  },
};

function TransactionForm({
  onSubmit,
  onChange,
  buttonProps,
  column,
  maxAmountButton,
  loading,
  formState: { to, amount },
}) {
  const { balance } = useOutletContext();

  const [errors, setErrors] = useState({
    to: "",
    amount: "",
  });

  const handleInputChange =
    (asNumber = false) =>
    (event) => {
      onChange({
        to,
        amount,
        [event.target.name]:
          !!asNumber && !!event.target.value
            ? event.target.valueAsNumber
            : event.target.value,
      });
      setErrors((errors) => ({
        ...errors,
        [event.target.name]: "",
      }));
    };

  function validate() {
    if (!amount || !to) {
      setErrors({
        ...(!to && {
          to: "Please provide an address!",
        }),
        ...(!amount && {
          amount: "Please provide an amount!",
        }),
      });

      return false;
    }

    if (!web3.utils.isAddress(to)) {
      setErrors({
        ...errors,
        address: "Please provide a valid address!",
      });

      return false;
    }

    return true;
  }

  function handleMaxValueSet() {
    onChange({ to, amount: Number(balance) });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    onSubmit?.({ to, amount });
  }

  function renderSubmitButton({ element, tooltip }) {
    if (!tooltip) return element;

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
            name="to"
            value={to}
            disabled={loading}
            onChange={handleInputChange()}
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
            disabled={loading}
            onChange={handleInputChange(true)}
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
            tooltip: amount > balance,
          })}
        </Grid>
      </Grid>
    </form>
  );
}

export default TransactionForm;
