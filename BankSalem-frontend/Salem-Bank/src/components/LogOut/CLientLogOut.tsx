import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { RemoveCurrentClientIDFromLocalStorage } from "../../Global/CurrentUserAndClent";
export default function ClientLogOut() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clearing client session, redirecting to login page)
    console.log("Client logged out");
    navigate("/");
    RemoveCurrentClientIDFromLocalStorage();
    handleClose();
  };

  return (
    <React.Fragment>
        <div style={{ display: 'flex', alignItems: 'center' ,justifyContent: 'left' }} >
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          marginTop: '15px',
          fontWeight: 'bold',
          marginLeft: '10px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <LogoutIcon sx={{ marginRight: '8px' }} />
        Log Out
      </Button>
      </div>

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
