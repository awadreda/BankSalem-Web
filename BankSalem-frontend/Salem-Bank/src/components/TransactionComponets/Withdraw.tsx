import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchClients } from "../../features/Clinets/ClinetsSlice";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { WithDrawSlice } from "../../features/Transactions/TransSlice";

export default function Withdraw({
  selectedClientID,
  
}: {
  selectedClientID: number;
  

}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const Client = useAppSelector((state) =>
    state.clients.clients.find((client) => client.id === selectedClientID)
  );

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(fetchClients());
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
          Withdraw
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
            const withdrawRequest = {
              clientId: selectedClientID,
              amount: Number(formJson.amount),
              userId: 1 // TODO: Get actual userId from auth
            };
            dispatch(WithDrawSlice(withdrawRequest));
            console.log(withdrawRequest);
            handleClose();
          },
        }}
      >
        <DialogTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AttachMoneyIcon sx={{ color: '#1976d2' }} />
            Withdraw Money
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
                  <span style={{
                    display: 'block',
                    fontWeight: 600,
                    color: '#1976d2',
                    marginBottom: '8px',
                    fontSize: '20px'
                  }}>
                    Client ID: {selectedClientID}
                  </span>
                  <span style={{
                    display: 'block',
                    fontWeight: 600,
                    color: '#1976d2',
                    marginBottom: '8px',
                    fontSize: '20px'
                  }}>
                    Client Name: {Client?.firstName} {Client?.lastName}
                  </span>
                </div>
              </div>
              <span style={{
                display: 'block',
                fontWeight: 600,
                color: '#2e7d32',
                fontSize: '20px'
              }}>
                Current Balance: ${Client?.accountBalance.toFixed(2)}
              </span>
            </div>

            <span style={{
              display: 'block',
              color: 'rgba(0, 0, 0, 0.6)',
              fontSize: '1rem'
            }}>
              Please enter the amount you would like to withdraw from account.
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
            placeholder="Enter withdrawal amount"
            InputProps={{
              startAdornment: <AttachMoneyIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#757575' }}>Cancel</Button>
          <Button type="submit" sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}>Withdraw</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
