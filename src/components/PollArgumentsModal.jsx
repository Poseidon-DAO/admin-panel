import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const DefaultArguments = {
  _pollTypeID: 0,
  _voteReceiverAddress: '',
}

export default function ArgumentsModal({
  open,
  handleClose,
  handleAccept,
  fnc,
}) {
  const [args, setArgs] = useState(DefaultArguments)
  const [description, setDescription] = useState('')
  const onSubmit = async () => {
    const fnArgs = {
      ...args,
      _voteReceiverAddress: args._voteReceiverAddress.length
        ? args._voteReceiverAddress
        : NULL_ADDRESS,
    }
    const res = await handleAccept(fnc, fnArgs, description)
    return res
  }

  const onArgumentChange = (value, name) => {
    if (name === '_pollTypeID') {
      setArgs(DefaultArguments)
    }
    const newArgs = {
      ...args,
    }
    newArgs[name] = value
    setArgs({ ...newArgs })
  }

  const closeModal = () => {
    setArgs(DefaultArguments)
    handleClose()
  }

  const PollTypeIdSelectField = (value, name) => (
    <MenuItem
      value={value}
      onClick={() => onArgumentChange(+value, '_pollTypeID')}
    >
      {name}
    </MenuItem>
  )
  const freezePollID = +process.env.REACT_APP_UNFREEZE

  return fnc !== null ? (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Input the arguments needed
        </Typography>
        {fnc.args.map(({ name, type }) => {
          if (name === '_pollTypeID') {
            return (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Poll Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={args._pollTypeID}
                  label="Poll Type"
                  defaultValue="Select a poll type"
                >
                  {PollTypeIdSelectField(
                    process.env.REACT_APP_CHANGE_CREATOR,
                    'Change Creator',
                  )}
                  {PollTypeIdSelectField(
                    process.env.REACT_APP_DELETE_ADDRESS,
                    'Delete Address',
                  )}
                  {PollTypeIdSelectField(
                    process.env.REACT_APP_ADD_ADDRESS,
                    'Add Address',
                  )}
                  {PollTypeIdSelectField(
                    process.env.REACT_APP_UNFREEZE,
                    'Unfreeze',
                  )}
                  {PollTypeIdSelectField(
                    process.env.REACT_APP_CHANGE_OWNER,
                    'Change Owner',
                  )}
                </Select>
              </FormControl>
            )
          } else
            return args._pollTypeID === freezePollID ||
              !args._pollTypeID ? null : (
              <FormControl fullWidth>
                <TextField
                  key={name}
                  style={{ marginTop: '1rem' }}
                  type="text"
                  value={args._voteReceiverAddress}
                  label={name}
                  variant="outlined"
                  required={true}
                  onChange={(e) =>
                    onArgumentChange(
                      type === Number ? +e.target.value : e.target.value,
                      name,
                    )
                  }
                />
              </FormControl>
            )
        })}
        <FormControl fullWidth>
          <TextField
            style={{ marginTop: '1rem' }}
            type="text"
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button
          sx={{ marginTop: '1rem' }}
          variant="contained"
          onClick={onSubmit}
          disabled={
            args._pollTypeID !== freezePollID && !args._voteReceiverAddress
          }
        >
          Submit
        </Button>
      </Box>
    </Modal>
  ) : null
}
