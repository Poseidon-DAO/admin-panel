import { Chip, Box, Button, Card, CardContent } from '@mui/material'
import React from 'react'
import { PollTypes, VoteTypes } from 'src/types'
import Iconify from './Iconify'

export default function PollComponent({ type, onApprove, onDecline, vote }) {
  const pollName = Object.keys(PollTypes).find(
    (key) => PollTypes[key] === `${type}`,
  )

  const hasVoted = VoteTypes[vote] === false ? false : true

  return (
    <Card sx={{ width: 250 }}>
      <CardContent>
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
          <>
            <Iconify
              icon={
                vote === 1
                  ? 'teenyicons:tick-circle-solid'
                  : 'material-symbols:cancel'
              }
              width={22}
              height={22}
              color={vote === 1 ? 'green' : '#FE4842'}
              style={{ position: 'absolute', top: 10, right: 10 }}
            />
            <Chip
              sx={{ marginTop: 2, marginBottom: 3 }}
              label={VoteTypes[vote]}
              variant="outlined"
              color={VoteTypes[vote] === 'Declined' ? 'error' : 'success'}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
