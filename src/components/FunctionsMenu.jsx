import { Alert, Chip, Container, Snackbar, Stack, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { accessibilityEventsOptions, accessibilityOptions, multiSigEventsOptions, multiSigOptions } from 'src/abis';
import ArgumentsModal from './ArgumentsModal';
import FreezeAlert from './FreezeAlert';

export default function FunctionsMenu({ availableFunctions, isMultiSig }) {
  const [error, setError] = useState("");
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, account } = useMoralis();
  const [modalActive, setModalActive] = useState(false);
  const [modalProps, setModalProps] = useState(null);
  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false);

  const fetchEvents = useCallback(async (event) => {
    let options; 
    if (isMultiSig) options = multiSigEventsOptions(event.name)
    else options = accessibilityEventsOptions(event.name)
    const res = await Web3Api.native.getContractEvents(options);
    //What to do when we receive the events
    console.log("Event fetch response: ", res);
  }, [Web3Api, isMultiSig]);

  const handleClick = (fn) => {
    if (account) {
      if (fn.inputRequired) {
        setModalProps(fn)
        setModalActive(true)
      }
      else {
        handleExecuteFunction(fn)
      }
    }
  }

  const onCancelModal = () => {
    setModalActive(false);
    setModalProps(null)
  }

  const handleExecuteFunction = useCallback(async (fn, args) => {
    try {
      if (account){
        let options;
        if (isMultiSig) options = multiSigOptions(account, fn.functionName, args);
        else options = accessibilityOptions(account, fn.functionName, args);
        const res = await Moralis.executeFunction(options);
        if (fn.event) {
          fetchEvents(fn.event)
        }
        return res;
      }
    } catch (error) {
      setError((error[0] || error.message) ?? "Something went wrong");
      return error;
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
            {availableFunctions.map((fn, i) => (
              <Chip key={i} label={fn.name} variant="outlined" color={fn.functionName === 'freeze' ? 'error' : 'primary'} 
                onClick={() => fn.functionName === 'freeze' ? setIsFreezeDialogOpen(true) : handleClick(fn)}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
      <Snackbar
        severity="error"
        open={error.length > 0}
        autoHideDuration={6000}
        onClose={() => {
          setError("");
        }}
        style={{ maxWidth: '40vw' }}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <Alert severity='error'>{error}</Alert>
      </Snackbar>
      <FreezeAlert
        onFreezeCanceled={() => setIsFreezeDialogOpen(false)}
        onFreezeConfirmed={() => {
          setIsFreezeDialogOpen(false)
          handleClick(availableFunctions.filter(f => f.functionName === 'freeze')[0])
        }}
        open={isFreezeDialogOpen}
      />
      <ArgumentsModal
        open={modalActive}
        handleClose={onCancelModal}
        handleAccept={handleExecuteFunction}
        fnc={modalProps}
      />
    </>
  )
}
