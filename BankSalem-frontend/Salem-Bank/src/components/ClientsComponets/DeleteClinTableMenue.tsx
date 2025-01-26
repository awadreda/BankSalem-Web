import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch } from "../../hooks";
import { DeleteClientSliceFuction, fetchClients } from "../../features/Clinets/ClinetsSlice";

export default function DeleteClinTableMenue({
  ClientID,
  onClose,
}: {
  ClientID: number;
  onClose: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const dispatch= useAppDispatch();

  const handleDelete = () => {
    dispatch(DeleteClientSliceFuction(ClientID)).then(() => {
        dispatch(fetchClients()); })
      ;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="text"
        color="error"
        onClick={() => {
          handleClickOpen();
        }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete client {ClientID}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              onClose();
            }}
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              onClose();
              handleDelete();
            }}
           color="error"

          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
