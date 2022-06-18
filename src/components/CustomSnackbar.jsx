import { Alert, Snackbar } from '@mui/material';
import React from 'react'

export default function CustomSnackbar({ type, message, isOpen, onClose }) {
  return (
    <Snackbar
      severity={type}
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClose}
      style={{ maxWidth: '40vw' }}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  )
}
