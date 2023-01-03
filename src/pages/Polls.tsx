import Page from "../components/Page";
import { FC, useEffect } from "react";
import { useState } from "react";
import {
  SMART_CONTRACT_EVENTS,
  SMART_CONTRACT_FUNCTIONS,
} from "src/contracts/smartContract";
import { Box, Container, Grid, Typography } from "@mui/material";
import PollArgumentsModal from "src/components/PollArgumentsModal";
import CustomSnackbar from "src/components/CustomSnackbar";
import { baseEtherscan } from "src/constants";
import { usePolls } from "src/lib";
import { LoadingButton } from "@mui/lab";
import Iconify from "src/components/Iconify";
import { useCreatePoll } from "src/lib/hooks/useCreatePoll";
import { useDebounce } from "src/hooks/useDebounce";
import { PollsList } from "src/sections/polls/polls-list";
import { FullPageLoader } from "src/components/FullPageLoader";
import PageTitle from "src/sections/common/page-title/PageTitle";

const CREATE_MULTISIG_POLL = {
  name: "Create Poll",
  functionName: SMART_CONTRACT_FUNCTIONS.CREATE_MULTISIG_POLL,
  inputRequired: true,
  args: [
    {
      name: "_pollTypeID",
      type: Number,
    },
  ],
  event: {
    name: SMART_CONTRACT_EVENTS.EVENT_NEW_MULTISIG,
    args: {
      pollType: 3,
      pollIndex: 1,
    },
  },
};

type IProps = {
  sectionTitle: string;
};

const Polls: FC<IProps> = ({ sectionTitle }) => {
  const [modalActive, setModalActive] = useState(false);
  const [modalProps, setModalProps] = useState<any | null>(null);

  const [pollTypeID, setPollTypeId] = useState<string | number>("");
  const [voteReceiverAddress, setVoteReceiverAddress] = useState<
    string | number
  >("");
  const debouncedPollTypeId = useDebounce(pollTypeID);
  const debouncedVoteReceiverAddress = useDebounce(voteReceiverAddress);

  const { votedPolls, pendingPolls, isLoading, pollsError, currentVoteError } =
    usePolls();

  const {
    createPoll,
    pollCreationResult,
    pollCreationStatus,
    pollCreationError,
  } = useCreatePoll({
    args: [debouncedPollTypeId, debouncedVoteReceiverAddress],
  });

  useEffect(() => {
    if (pollCreationStatus === "success") {
      handleModalClose();
    }
  }, [pollCreationStatus]);

  function handleModalClose() {
    setModalActive(false);
    setModalProps(null);
  }

  const handleClick = () => {
    setModalProps(CREATE_MULTISIG_POLL);
    setModalActive(true);
  };

  function handelCreateMultisigPollDataChange(newArgs: {
    _pollTypeID: string | number;
    _voteReceiverAddress: string | number;
  }) {
    setPollTypeId(newArgs._pollTypeID);
    setVoteReceiverAddress(newArgs._voteReceiverAddress);
  }

  function handleCreateMultisigPoll() {
    createPoll?.();
  }

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <Page title="Active Polls">
      <Container maxWidth="xl">
        <Grid container wrap="nowrap" justifyContent="space-between">
          <Box width="80%">
            <PageTitle>{sectionTitle}</PageTitle>
          </Box>

          <Box paddingTop={1}>
            <LoadingButton
              variant="contained"
              size="large"
              color="success"
              style={{ width: "100%", color: "white" }}
              startIcon={<Iconify icon="material-symbols:add" />}
              loading={pollCreationStatus === "loading"}
              disabled={pollCreationStatus === "loading"}
              onClick={handleClick}
            >
              New Poll
            </LoadingButton>
          </Box>
        </Grid>

        <PollArgumentsModal
          open={modalActive}
          handleClose={handleModalClose}
          handleAccept={handleCreateMultisigPoll}
          handleChange={handelCreateMultisigPollDataChange}
          fnc={modalProps}
        />

        <Typography variant="h5">Active Polls</Typography>
        {!!pendingPolls.length ? (
          <Box sx={{ flexGrow: 1 }}>
            <PollsList polls={pendingPolls} />
          </Box>
        ) : (
          <Typography>There are no pending polls at the moment.</Typography>
        )}

        <Typography variant="h5">Voted Polls</Typography>
        {!!votedPolls.length ? (
          <Box sx={{ flexGrow: 1 }}>
            <PollsList polls={votedPolls} />
          </Box>
        ) : (
          <Grid
            minHeight="200px"
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">
              There are no votted polls at the moment.
            </Typography>
          </Grid>
        )}

        <CustomSnackbar
          isOpen={!!pollCreationError || !!pollsError || !!currentVoteError}
          type="error"
          message={
            pollCreationError?.message ||
            pollsError?.message ||
            currentVoteError?.message
          }
        />

        <CustomSnackbar
          isOpen={pollCreationStatus === "success"}
          type="success"
          message={
            <Typography>
              The transaction was successful! Hash:{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={baseEtherscan + pollCreationResult?.hash}
              >
                {pollCreationResult?.hash.slice(0, 8) +
                  "..." +
                  pollCreationResult?.hash?.slice(-8)}
              </a>
            </Typography>
          }
        />
      </Container>
    </Page>
  );
};

export default Polls;
