import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Tooltip,
  Switch,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import web3 from "web3";
import { useOutletContext } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

function TransactionForm({
  onSubmit,
  onChange,
  buttonProps = { title: "" },
  column = false,
  maxAmountButton = false,
  loading = false,
  formState = { to: "", amount: "", vestingAmount: "" },
  vestingAvailable = false,
  onVestingChange,
  airdrop = false,
}) {
  const { balance } = useOutletContext();
  const { to, amount, vestingAmount } = formState;
  const [vesting, setVesting] = useState(false);

  const [errors, setErrors] = useState({
    to: "",
    amount: "",
    vestingAmount: "",
  });

  useEffect(() => {
    onVestingChange?.(vesting);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vesting]);

  const handleInputChange =
    (asNumber = false) =>
    (event) => {
      onChange({
        to,
        amount,
        ...(vestingAvailable && {
          vestingAmount,
        }),
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

    if (vesting && !vestingAmount) {
      setErrors({
        ...errors,
        vestingAmount: "Please provide a vesting amount!",
      });

      return false;
    }

    return true;
  }

  function handleMaxValueSet() {
    onChange({
      to,
      amount: Number(balance),
      ...(vestingAvailable && {
        vestingAmount,
      }),
    });
  }

  function handleVestingChange() {
    setVesting((vesting) => !vesting);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    onSubmit?.({
      to,
      amount,
      ...(vestingAvailable && {
        vestingAmount,
      }),
    });
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
        direction={column || vesting ? "column" : "row"}
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

        <Grid
          {...(vesting && {
            container: true,
            wrap: "nowrap",
          })}
          item
          xs={3}
        >
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

          {vesting && (
            <TextField
              name="vestingAmount"
              value={vestingAmount}
              disabled={loading}
              onChange={handleInputChange(true)}
              placeholder="5760"
              label="Blocks"
              type="number"
              autoComplete="off"
              InputLabelProps={{ shrink: true }}
              error={!!errors["vestingAmount"]}
              helperText={errors["vestingAmount"]}
              style={{ width: "100%", marginLeft: 16 }}
            />
          )}
        </Grid>

        <Grid
          item
          xs
          container
          justifyContent="flex-end"
          alignItems="center"
          {...(!vesting &&
            !!vestingAvailable && {
              flexDirection: "column-reverse",
              alignItems: "stretch",
            })}
        >
          {vestingAvailable && (
            <Box
              {...(!vesting
                ? {
                    marginTop: 2,
                  }
                : { marginRight: 2 })}
            >
              <FormControlLabel
                style={{ marginRight: 0 }}
                disabled={loading}
                control={
                  <Switch checked={vesting} onChange={handleVestingChange} />
                }
                label={<Typography>Vesting</Typography>}
                labelPlacement={vesting ? "start" : "end"}
              />
            </Box>
          )}

          {renderSubmitButton({
            element: (
              <LoadingButton
                variant="outlined"
                size="large"
                type="submit"
                style={{ marginTop: 4 }}
                disabled={!airdrop && amount > balance}
                loading={loading}
                {...allButtonProps}
              >
                {title || "Add"}
              </LoadingButton>
            ),
            showTooltip: airdrop ? false : balance < amount,
          })}
        </Grid>
      </Grid>
    </form>
  );
}

export default TransactionForm;
