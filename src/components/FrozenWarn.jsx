import { Box } from '@mui/material'
import React from 'react'

export default function FrozenWarn() {
  return (
    <Box sx={{ width: '100%', height: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF6666' }}>
      <h4 color='#fff'>The DAO is frozen</h4>
    </Box>
  )
}
