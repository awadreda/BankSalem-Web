import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { GetCurrentUserIDFromLocalStorage, RemoveCurrentUserIDFromLocalStorage } from "../../Global/CurrentUserAndClent";
import { registerLogSlice } from "../../features/Logs/LogsSlice";
import { useAppDispatch } from "../../hooks";


export default function LogOut() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const currentUserid = GetCurrentUserIDFromLocalStorage();
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clearing user session, redirecting to login page)
    // console.log("User logged out");
    dispatch(registerLogSlice({
      userID : parseInt(currentUserid || "0"),
      logTypeID : 2
    }));
    navigate("/");

    RemoveCurrentUserIDFromLocalStorage();
    handleClose();
  };


  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          margin: '4px 8px',
          borderRadius: '8px',
          padding: '8px 16px',
           color:"white",
         border:"none",
         outline:"none",
         display:"flex",
         justifyContent:"left",
         alignItems:"center",
         fontSize:"16px",
         fontWeight:"bold",
         position:"relative",
         bottom:"-190px",
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <LogoutIcon sx={{ marginRight: '8px' }} />
        Log Out
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">{"Confirm Log Out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out? You will need to log in again to
            access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
