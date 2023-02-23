import {
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
  type ReactNode,
} from "react";
import web3 from "web3";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  TextField,
  Button,
  Tooltip,
  Switch,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
  ButtonProps,
} from "@mui/material";

import Iconify from "src/components/Iconify";
import { useSecurityDelayInBlocks } from "src/lib/chain";
import { useRouterContext } from "src/hooks";

type FormState = {
  to: string;
  amount: string | number;
  vestingAmount?: string | number | null;
};

type IProps = {
  buttonProps?: {
    title?: string;
    disabled?: boolean;
    tooltipText?: string;
    variant?: ButtonProps["variant"];
  };
  column?: boolean;
  maxAmountButton?: boolean;
  loading?: boolean;
  vestingAvailable?: boolean;
  formState: FormState;

  onVestingChange?: (vestingStatus: boolean) => void;
  onChange?: (formState: FormState) => void;
  onSubmit?: (formState: FormState) => void;
};

const TransactionForm: FC<IProps> = ({
  buttonProps = { title: "", disabled: false, tooltipText: "" },
  column = false,
  maxAmountButton = false,
  loading = false,
  formState = { to: "", amount: "", vestingAmount: "" },
  vestingAvailable = false,
  onVestingChange,
  onSubmit,
  onChange,
}) => {
  const { balance } = useRouterContext();
  const { to, amount, vestingAmount } = formState;
  const [vesting, setVesting] = useState(false);
  const { delayInBlocks } = useSecurityDelayInBlocks();

  const [errors, setErrors] = useState<Partial<FormState>>({
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
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange?.({
        to,
        amount,
        ...(vestingAvailable && {
          vestingAmount,
        }),
        [event.target.name]:
          !!asNumber && !!event.target.value
            ? (event as ChangeEvent<HTMLInputElement>).target.valueAsNumber
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
        to: "Please provide a valid address!",
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
    onChange?.({
      to,
      amount: Number(balance),
      ...(vestingAvailable && {
        vestingAmount,
      }),
    });
  }

  function handleMinValueSet() {
    onChange?.({
      to,
      amount,
      ...(vestingAvailable && {
        vestingAmount: delayInBlocks,
      }),
    });
  }

  function handleRemove(newValue: Partial<FormState>) {
    onChange?.({
      to,
      amount,
      ...(vestingAvailable && {
        vestingAmount,
      }),
      ...newValue,
    });
  }

  function handleVestingChange() {
    setVesting((vesting) => !vesting);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

  function renderSubmitButton({
    element,
    tooltipText,
  }: {
    element: ReactNode;
    tooltipText?: string;
  }) {
    if (!tooltipText) return element;

    return (
      <Tooltip title={tooltipText}>
        <span>{element}</span>
      </Tooltip>
    );
  }

  const { title, tooltipText, ...allButtonProps } = buttonProps;

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
            error={!!errors["to"]}
            helperText={errors["to"]}
            style={{ width: "100%" }}
            InputProps={{
              endAdornment: to && (
                <Tooltip title="Remove address" placement="top">
                  <IconButton
                    size="medium"
                    onClick={() => handleRemove({ to: "" })}
                  >
                    <Iconify icon="charm:cross" />
                  </IconButton>
                </Tooltip>
              ),
            }}
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
              endAdornment: (
                <>
                  <Tooltip
                    title={
                      <>
                        <p>e.g.</p>
                        <p>
                          0.01{" "}
                          <span style={{ float: "right", marginLeft: 10 }}>
                            $PDN
                          </span>
                        </p>
                        <p>
                          10{" "}
                          <span style={{ float: "right", marginLeft: 10 }}>
                            $PDN
                          </span>
                        </p>
                        <p>
                          100.5{" "}
                          <span style={{ float: "right", marginLeft: 10 }}>
                            $PDN
                          </span>
                        </p>
                      </>
                    }
                    arrow
                  >
                    <IconButton
                      style={{ margin: "0 5px", cursor: "help" }}
                      disableTouchRipple
                    >
                      <Iconify
                        icon="ant-design:info-circle-outlined"
                        width={20}
                        height={20}
                        color="inherit"
                      />
                    </IconButton>
                  </Tooltip>

                  {!amount ? (
                    maxAmountButton ? (
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
                    ) : null
                  ) : (
                    <Tooltip title="Remove amount" placement="top">
                      <IconButton
                        size="medium"
                        onClick={() => handleRemove({ amount: "" })}
                      >
                        <Iconify icon="charm:cross" />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              ),
            }}
          />

          {vesting && (
            <TextField
              name="vestingAmount"
              value={vestingAmount}
              disabled={loading}
              onChange={handleInputChange(true)}
              placeholder={delayInBlocks?.toString() || ""}
              label="Blocks"
              type="number"
              autoComplete="off"
              InputLabelProps={{ shrink: true }}
              error={!!errors["vestingAmount"]}
              helperText={errors["vestingAmount"]}
              style={{ width: "100%", marginLeft: 16 }}
              InputProps={{
                endAdornment: !vestingAmount ? (
                  <Tooltip
                    title="Use the min block height set on settings"
                    placement="top"
                  >
                    <Button
                      variant="text"
                      size="medium"
                      onClick={handleMinValueSet}
                    >
                      Min
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Remove blocks" placement="top">
                    <IconButton
                      size="medium"
                      onClick={() => handleRemove({ vestingAmount: "" })}
                    >
                      <Iconify icon="charm:cross" />
                    </IconButton>
                  </Tooltip>
                ),
              }}
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
                loading={loading}
                {...allButtonProps}
              >
                {title || "Add"}
              </LoadingButton>
            ),
            tooltipText: !!buttonProps.disabled ? tooltipText : "",
          })}
        </Grid>
      </Grid>
    </form>
  );
};

export default TransactionForm;
