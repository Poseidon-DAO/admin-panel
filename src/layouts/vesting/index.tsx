import { type FC, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { useVestLength, useVestsMetadata } from "src/lib/chain";
import { useDeleteUnexpiredVests } from "src/lib/chain/hooks/useDeleteUnexpiredVests";
import { getTransactionLink } from "src/utils/getTransactionLink";

import TransactionSnackbar from "src/sections/common/transaction-snackbar/TransactionSnackbar";
import SearchInput from "src/sections/vesting/search-input/SearchInput";
import VestingTable from "src/sections/vesting/vesting-table/VestingTable";

const VestingLayout: FC = () => {
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [address, setAddress] = useState("");
  const [vestToDelete, setVestToDelete] = useState<number | null>(null);

  const { vestLength, vestLengthStatus } = useVestLength({
    address,
    enabled: shouldSubmit,
  });
  const { vestsMetadata } = useVestsMetadata({
    vestLength,
    address,
    enabled: shouldSubmit,
  });

  const {
    deleteUnExpiredVests,
    deleteUnExpiredVestsData,
    deleteUnExpiredVestsStatus,
  } = useDeleteUnexpiredVests({
    address,
    start: vestToDelete,
    end: vestToDelete,
  });

  useEffect(() => {
    if (!address) {
      setShouldSubmit(false);
    }
  }, [address]);

  useEffect(() => {
    if (typeof vestToDelete === "number" && vestToDelete >= 0) {
      deleteUnExpiredVests?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vestToDelete]);

  useEffect(() => {
    if (deleteUnExpiredVestsStatus === "success") {
      setVestToDelete(null);
    }
  }, [deleteUnExpiredVestsStatus]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
  }

  function handleGetVests() {
    setShouldSubmit(true);
  }

  function handleAddressRemove() {
    setAddress("");
  }

  function handleDeleteVest(selectedVestIndex: number) {
    setVestToDelete(selectedVestIndex);
  }

  const isVerifying = deleteUnExpiredVestsStatus === "loading";

  const snackBarVariant = {
    loading: "info",
    error: "error",
    success: "success",
    idle: "",
  }[deleteUnExpiredVestsStatus];

  const rows = vestsMetadata.map((metadata) => ({
    ...metadata,
    address,
  }));

  const hasFetchedVestLength = vestLengthStatus === "success";

  return (
    <Box>
      <SearchInput
        address={address}
        onChange={handleInputChange}
        onClick={handleGetVests}
        onDelete={handleAddressRemove}
      />

      {(!vestLength || vestLength === 0) &&
        shouldSubmit &&
        hasFetchedVestLength && (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            minHeight="50vh"
          >
            <Typography variant="h5" maxWidth="450px" textAlign="center">
              There are no active vests for this account!
            </Typography>
          </Grid>
        )}

      {!shouldSubmit && (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <Typography variant="h5" maxWidth="600px" textAlign="center">
            Please provide an address, in order to get the data about vesting
            related to the address
          </Typography>
        </Grid>
      )}

      {!!vestLength &&
        vestLength > 0 &&
        !!vestsMetadata.length &&
        shouldSubmit && (
          <VestingTable
            rows={rows}
            onRowDelete={handleDeleteVest}
            isLoading={deleteUnExpiredVestsStatus === "loading"}
            loadingId={vestToDelete}
          />
        )}

      {deleteUnExpiredVestsStatus !== "idle" && (
        <TransactionSnackbar
          variant={snackBarVariant}
          message={isVerifying ? "The transaction is being verified!" : ""}
          loading={isVerifying}
          duration={isVerifying ? null : 3000}
          etherscanLink={getTransactionLink(deleteUnExpiredVestsData?.hash)}
        />
      )}
    </Box>
  );
};

export default VestingLayout;
