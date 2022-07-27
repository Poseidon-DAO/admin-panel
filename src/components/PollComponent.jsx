import {
  Chip,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Countdown from 'react-countdown'
import { PollTypes, VoteTypes } from 'src/types'
import Iconify from './Iconify'

export default function PollComponent({ onApprove, onDecline, poll }) {
  const [mouseOnAddress, setMouseOnAddress] = useState(false)
  const {
    currentVote,
    type,
    expiration,
    amountApprovedVoteReceiver,
    multiSigLength,
    description,
    voteReceiverAddress,
  } = poll
  const pollName = Object.keys(PollTypes).find(
    (key) => PollTypes[key] === `${type}`,
  )

  const showReceiverAddress = pollName !== 'unfreeze'

  const onCopyAddress = () => navigator.clipboard.writeText(voteReceiverAddress)

  const hasVoted = VoteTypes[currentVote] === false ? false : true
  return (
    <Card sx={{ width: 250, minHeight: '100%' }}>
      <CardContent>
        <h3>{pollName.toUpperCase()}</h3>
        <Box display="flex" flexDirection="column" maxWidth="100%">
          <Typography
            variant="body2"
            color={!mouseOnAddress ? 'textSecondary' : 'green'}
            component="p"
            width="100%"
            sx={{ cursor: 'pointer' }}
            onClick={() => onCopyAddress()}
            onMouseEnter={() => setMouseOnAddress(true)}
            onMouseLeave={() => setMouseOnAddress(false)}
          >
            {showReceiverAddress &&
              voteReceiverAddress.slice(0, 8) +
                ' ... ' +
                voteReceiverAddress.slice(-6)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            mt={1}
          >
            {description || 'No description found'}
          </Typography>
        </Box>
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          marginY={1.5}
        >
          <Box>
            <Typography sx={{ fontSize: 14, marginTop: '.5rem' }}>
              Expires in:
            </Typography>
            <Countdown date={Date.now() + expiration} />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Typography sx={{ fontSize: 14, marginTop: '.5rem' }}>
              Approved By:
            </Typography>
            <Typography sx={{ textAlign: 'right' }}>
              {amountApprovedVoteReceiver + '/' + multiSigLength}
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
            <Button onClick={onApprove} variant="outlined">
              Approve
            </Button>
            <Button onClick={onDecline} color="error" sx={{ marginLeft: 5 }}>
              Decline
            </Button>
          </Box>
        ) : (
          <Box display="flex" justifyContent="flex-end" pt={2}>
            <Iconify
              icon={
                currentVote === 1
                  ? 'teenyicons:tick-circle-solid'
                  : 'material-symbols:cancel'
              }
              width={22}
              height={22}
              color={currentVote === 1 ? 'green' : '#FE4842'}
              style={{ position: 'absolute', top: 10, right: 10 }}
            />
            <Chip
              label={`You ${VoteTypes[currentVote]}`}
              variant="outlined"
              color={
                VoteTypes[currentVote] === 'Declined' ? 'error' : 'success'
              }
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
