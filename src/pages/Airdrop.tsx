import { type FC, useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Page from "src/components/Page";
import AirdropTable from "src/sections/airdrop/table/Table";
import TransactionForm from "src/sections/common/transaction-form/TransactionForm";
import CSVLoader from "src/sections/airdrop/csv-loader/CSVLoader";
import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import PageTitle from "src/sections/common/page-title/PageTitle";

import { useAirdrop, useSecurityDelayInBlocks } from "src/lib";
import { getTransactionLink } from "src/utils/getTransactionLink";
import { useRouterContext } from "src/hooks";

type IProps = {
  sectionTitle: string;
};

type Account = {
  address: string;
  amount: string | number;
  vestingAmount?: string | number | null;
};

const Airdrop: FC<IProps> = ({ sectionTitle }) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<string | number>("");
  const [vestingAmount, setVestingAmount] = useState<string | number | null>(
    ""
  );

  const [isVestingActive, setVestingActive] = useState(false);

  const [airdropAddresses, setAirdropAddresses] = useState<Account[]>([]);
  const [fileUploadError, setFileUploadError] = useState("");

  const { delayInBlocks } = useSecurityDelayInBlocks();
  const { runAirdrop, airdropData, transferStatus } = useAirdrop({
    accounts: airdropAddresses,
    isVestingActive: !!isVestingActive,
  });

  const { refetchBalance } = useRouterContext();

  useEffect(() => {
    setAirdropAddresses([]);
  }, [isVestingActive]);

  useEffect(() => {
    if (transferStatus === "success") {
      refetchBalance();
      setAirdropAddresses([]);
      clearState();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferStatus]);

  function clearState() {
    setAddress("");
    setAmount("");
    setVestingAmount("");
  }

  function handleAddressAdd({
    to,
    amount,
    vestingAmount,
  }: { to: string } & Omit<Account, "address">) {
    setAirdropAddresses((prevAddresses) => [
      ...prevAddresses,
      { address: to, amount, vestingAmount },
    ]);
    clearState();
  }

  function handleCSVFileLoad(addresses: Account[], error: Error) {
    if (!!error) {
      setFileUploadError("Wrong data format on file!");
      return;
    }
    setAirdropAddresses(addresses);
  }

  function handleCSVFileRemove() {
    setAirdropAddresses([]);
  }

  function handleRemoveRows(selected: string[]) {
    setAirdropAddresses((addresses) =>
      addresses.filter(({ address }) => !selected.includes(address))
    );
  }

  function handleFormStateChange(
    formState: { to: string } & Omit<Account, "address">
  ) {
    setAddress(formState.to);
    setAmount(formState.amount);
    setVestingAmount(formState?.vestingAmount!);
  }

  function handleAirdrop() {
    runAirdrop?.();
  }

  const isVerifying = transferStatus === "loading";

  const showSnackbar = transferStatus !== "idle";
  const snackbarDuration = isVerifying ? null : 3000;

  const snackbarVariantForState = {
    loading: "info",
    error: "error",
    success: "success",
    idle: "",
  }[transferStatus];

  const snackbarMessage = isVerifying
    ? "The transaction is being verified!"
    : fileUploadError || "";

  return (
    <Page title="Airdrop">
      <Container maxWidth="xl">
        <Grid container wrap="nowrap" justifyContent="space-between">
          <Box width="80%">
            <PageTitle>{sectionTitle}</PageTitle>
          </Box>

          <Box paddingTop={1}>
            <CSVLoader
              isVestingActive={isVestingActive}
              onFileLoad={handleCSVFileLoad}
              onFileRemove={handleCSVFileRemove}
              removeFileCondition={!airdropAddresses.length} //  in case user deletes all accounts from table we remove the file
              disabled={transferStatus === "loading" || isVerifying}
            />
          </Box>
        </Grid>

        <TransactionForm
          vestingAvailable
          formState={{ to: address, amount, vestingAmount }}
          loading={transferStatus === "loading" || isVerifying}
          onVestingChange={(vestingState: boolean) =>
            setVestingActive(vestingState)
          }
          onChange={handleFormStateChange}
          onSubmit={handleAddressAdd}
          buttonProps={{
            title: "Add",
            disabled: vestingAmount
              ? Number(vestingAmount) < delayInBlocks!
              : false,
            tooltipText: "Blocks number is below the minimum value",
          }}
        />

        {!!airdropAddresses.length && (
          <AirdropTable
            isVestingActive={isVestingActive}
            rows={airdropAddresses}
            onRowsDelete={handleRemoveRows}
          />
        )}

        {!!airdropAddresses.length && (
          <LoadingButton
            variant="contained"
            size="large"
            color="success"
            style={{ marginTop: 30, width: "100%", color: "white" }}
            loading={transferStatus === "loading" || isVerifying}
            disabled={isVerifying}
            onClick={handleAirdrop}
          >
            Run Airdrop
          </LoadingButton>
        )}
      </Container>

      {showSnackbar && (
        <TransactionSnackbar
          variant={snackbarVariantForState}
          message={snackbarMessage}
          loading={isVerifying}
          duration={snackbarDuration}
          etherscanLink={getTransactionLink(airdropData?.hash)}
        />
      )}
    </Page>
  );
};

export default Airdrop;
