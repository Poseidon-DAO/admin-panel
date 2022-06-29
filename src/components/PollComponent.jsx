import { Chip, Box, Button } from '@mui/material'
import React from 'react'
import { PollTypes, VoteTypes } from 'src/types'

export default function PollComponent({ type, onApprove, onDecline, vote }) {
  const pollName = Object.keys(PollTypes).find(
    (key) => PollTypes[key] === `${type}`,
  )

  const hasVoted = VoteTypes[vote] === false ? false : true

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>{pollName.toUpperCase()}</h3>
      {!hasVoted ? (
        <Box display="flex" mt={1}>
          <Button onClick={onApprove} variant="outlined">
            Approve
          </Button>
          <Button onClick={onDecline} color="error" sx={{ marginLeft: 5 }}>
            Decline
          </Button>
        </Box>
      ) : (
        <Chip
          sx={{ marginTop: 2, marginBottom: 3 }}
          label={VoteTypes[vote]}
          variant="outlined"
          color={VoteTypes[vote] === 'Declined' ? 'error' : 'success'}
        />
      )}
    </div>
  )
}
