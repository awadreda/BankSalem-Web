import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {  FindClientByIdClientSlice } from "../../features/Clinets/ClinetsSlice";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { DepositeSlice } from "../../features/Transactions/TransSlice";
import { fetchClients } from "../../features/Clinets/ClinetsSlice";


export default function Deposite({selectedClientID}: { selectedClientID: number }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const Client = useAppSelector((state) => state.clients.client);
  const CurrentClient = useAppSelector((state) => state.clients.CurrentClient);

  


  const handleClickOpen = () => {
    setOpen(true);
    dispatch(FindClientByIdClientSlice(selectedClientID));
  };
  
  const handleClose = () => {
    dispatch(FindClientByIdClientSlice(selectedClientID));
    setOpen(false);
  };








  return (
    <React.Fragment>
        <Button sx={{ position: CurrentClient ? "absolute" : "relative", width: CurrentClient ? "100%" : "auto" ,height: CurrentClient ? "100%" : "auto" ,opacity: CurrentClient ? 0 : 1 }} variant="outlined" onClick={handleClickOpen}>
        Deposite
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const depositRequest = {
              clientId: selectedClientID,
              amount: Number(formJson.amount),
              userId: 1, // TODO: Get actual userId from auth
            };
            dispatch(DepositeSlice(depositRequest));
            dispatch(fetchClients());
            console.log(depositRequest);
            handleClose();

          },
        }}
      >
        <DialogTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AttachMoneyIcon sx={{ color: '#1976d2' }} />
            Deposit Money
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 2 }}>
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56, marginRight: '16px' }}>
                  <PersonIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <div>
                  <span
                    style={{
                      display: "block",
                      fontWeight: 600,
                      color: "#1976d2",
                      marginBottom: "8px",
                      fontSize: "20px",
                    }}
                  >
                    Client ID: {selectedClientID}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontWeight: 600,
                      color: "#1976d2",
                      marginBottom: "8px",
                      fontSize: "20px",
                    }}
                  >
                    Client Name: {Client?.firstName} {Client?.lastName}
                  </span>
                </div>
              </div>
              <span
                style={{
                  display: "block",
                  fontWeight: 600,
                  color: "#2e7d32",
                  fontSize: "20px",
                }}
              >
                Current Balance: ${Client?.accountBalance.toFixed(2)}
              </span>
            </div>

            <span
              style={{
                display: "block",
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "1rem",
              }}
            >
              Please enter the amount you would like to deposit to account.
            </span>
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{ min: 0, step: "0.01" }}
            placeholder="Enter deposit amount"
            InputProps={{
              startAdornment: <AttachMoneyIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#757575' }}>Cancel</Button>
          <Button type="submit" sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}>Deposit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
