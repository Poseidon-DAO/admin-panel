import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function FreezeModal({ isOpen = false, onCancel, onSubmit }) {
  return (
    <Dialog open={isOpen} maxWidth="600px">
      <DialogTitle>WARNING</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Freezing DAO is an action that can't be undone unless a voting process
          takes place!
        </DialogContentText>

        <DialogContentText fontWeight="600">
          Are you sure you want to continue?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => onCancel?.()}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onSubmit?.()}
          autoFocus
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
