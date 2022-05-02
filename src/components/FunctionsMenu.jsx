import { Alert, Chip, Container, Snackbar, Stack, Typography } from '@mui/material';
import React, { useCallback } from 'react'
import { useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { accessibilityEventsOptions, accessibilityOptions, multiSigEventsOptions, multiSigOptions } from 'src/abis';
import FreezeAlert from './FreezeAlert';

export default function FunctionsMenu({ availableFunctions, isMultiSig, params }) {
  const [error, setError] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, account } = useMoralis();

  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false);

  const fetchEvents = useCallback(async (event) => {

    let options; 
    if (isMultiSig) options = multiSigEventsOptions(event.name, event.args)
    else options = accessibilityEventsOptions(event.name, event.args)
    console.log(options)
    const res = await Web3Api.native.getContractEvents(options);

    //What to do when we receive the events
    console.log("Event fetch response: ", res);
  }, [Web3Api, isMultiSig]);

  const handleClick = useCallback(async (fn) => {
    try {
      if (account){
        let options;
        if (isMultiSig) options = multiSigOptions(account, fn.functionName, fn.args);
        else options = accessibilityOptions(account, fn.functionName, fn.args);
        await Moralis.executeFunction(options);
        if (fn.event) {
          fetchEvents(fn.event)
        }
      }
    } catch (error) {
      setError(true);
      console.log("Error", error);
    }
  }, [Moralis, account, fetchEvents, isMultiSig]);

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {isMultiSig ? "Multi Signature" : "Accessibility"} Available Functions
        </Typography>
        <Stack direction="row" flexWrap="wrap" alignItems="center" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {availableFunctions.map((f, i) => (
              <Chip key={i} label={f.name} variant="outlined" color={f.functionName === 'freeze' ? 'error' : 'primary'} 
                onClick={() => f.functionName === 'freeze' ? setIsFreezeDialogOpen(true) : handleClick(f)}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
      <Snackbar
        severity="error"
        open={error}
        autoHideDuration={6000}
        onClose={() => {
          setError(false);
        }}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <Alert severity='error'>Something went wrong in the transaction!</Alert>
      </Snackbar>
      <FreezeAlert
        onFreezeCanceled={() => setIsFreezeDialogOpen(false)}
        onFreezeConfirmed={() => {
          setIsFreezeDialogOpen(false)
          handleClick(availableFunctions.filter(f => f.functionName === 'freeze')[0])
        }}
        open={isFreezeDialogOpen}
      />
    </>
  )
}
