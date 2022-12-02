import {
  Chip,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import Countdown from "react-countdown";
import {
  useMultisigLength,
  usePollExpirationBlock,
  usePollMetadata,
  useVote,
} from "src/lib";
import { PollTypes, VoteTypes } from "src/types";

import Iconify from "./Iconify";

export default function PollComponent({ poll }) {
  const { currentVote, _hex } = poll;
  const { type, amountApprovedVoteReceiver } = usePollMetadata({
    pollId: _hex,
  });
  const { expirationBlock } = usePollExpirationBlock({ pollId: _hex });
  const { multisigLength } = useMultisigLength();

  const [voteValue, setVoteValue] = useState(null);
  const { vote } = useVote({ pollIndex: _hex, vote: voteValue });

  const pollName = Object.keys(PollTypes).find(
    (key) => PollTypes[key] === `${type}`
  );

  const hasVoted = VoteTypes[currentVote] === false ? false : true;

  useEffect(() => {
    if (!!voteValue) {
      vote?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteValue]);

  function handleApprove() {
    setVoteValue(1);
  }

  function handleDecline() {
    setVoteValue(0);
  }

  return (
    <Card sx={{ width: 260, minHeight: "100%" }}>
      <CardContent>
        <Typography noWrap variant="h5" title={pollName.toUpperCase()}>
          {pollName.toUpperCase()}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {"description" || "No description found"}
        </Typography>
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          marginY={1.5}
        >
          <Box>
            <Typography sx={{ fontSize: 14, marginTop: ".5rem" }}>
              Expires in:
            </Typography>
            <Countdown date={Date.now() + expirationBlock} />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Typography sx={{ fontSize: 14, marginTop: ".5rem" }}>
              Approved By:
            </Typography>
            <Typography sx={{ textAlign: "right" }}>
              {amountApprovedVoteReceiver + "/" + multisigLength}
            </Typography>
          </Box>
        </Box>
        {!hasVoted ? (
          <Box
            display="flex"
            mt={1}
            backgroundColor="#F1F2F4"
            borderRadius={1}
            padding={1}
          >
            <Button onClick={handleApprove} variant="outlined">
              Approve
            </Button>
            <Button
              onClick={handleDecline}
              color="error"
              sx={{ marginLeft: 5 }}
            >
              Decline
            </Button>
          </Box>
        ) : (
          <Box display="flex" justifyContent="flex-end" pt={2}>
            <Iconify
              icon={
                currentVote === 1
                  ? "teenyicons:tick-circle-solid"
                  : "material-symbols:cancel"
              }
              width={22}
              height={22}
              color={currentVote === 1 ? "green" : "#FE4842"}
              style={{ position: "absolute", top: 10, right: 10 }}
            />
            <Chip
              label={`You ${VoteTypes[currentVote]}`}
              variant="outlined"
              color={
                VoteTypes[currentVote] === "Declined" ? "error" : "success"
              }
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
