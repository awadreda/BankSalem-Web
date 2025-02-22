import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteUser, getAllUsers } from "../../features/Users/UsersSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";


export default function DeleteUser({
  userId,
  onClose,
}: {
  userId: number;
  onClose: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const stateUser = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    // console.log("userId from deleteUser : ", userId);
    dispatch(deleteUser(userId)).then(() => {
      // console.log("stateUser from deleteUser : ", stateUser);
      dispatch(getAllUsers());
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        color="error"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete user {userId}?
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
