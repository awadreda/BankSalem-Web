import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch } from "../../hooks";
import { DeleteClientSliceFuction, fetchClients } from "../../features/Clinets/ClinetsSlice";
import { useTheme } from "@mui/material/styles";
import { IconButton, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteClinTableMenue({
  ClientID,
  onClose,
}: {
  ClientID: number;
  onClose: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const dispatch= useAppDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleDelete = () => {
    dispatch(DeleteClientSliceFuction(ClientID)).then(() => {
        dispatch(fetchClients());
    }).catch(error => {
        console.error("Error deleting client:", error);
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {isMobile || isTablet ? (
        <IconButton
          sx={{ color: "#DC2626", "&:hover": { backgroundColor: "#FEF2F2" } }}
        >
          <DeleteIcon />  
        </IconButton>
      ) : (
        <Button
          variant="text"
          color="error"
          onClick={() => {
            handleClickOpen();
          }}
        >
          Delete
        </Button>
      )}
      
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
              handleDelete();
              handleClose();
              onClose();
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
