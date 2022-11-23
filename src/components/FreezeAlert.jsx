import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FreezeAlert({
  onFreezeConfirmed,
  open,
  onFreezeCanceled,
}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onFreezeCanceled}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to freeze the DAO?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This is the last option that we should use. It's hard to reset and
            it stops all functionality from working.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onFreezeCanceled}>CANCEL</Button>
          <Button onClick={onFreezeConfirmed} color="error">
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
