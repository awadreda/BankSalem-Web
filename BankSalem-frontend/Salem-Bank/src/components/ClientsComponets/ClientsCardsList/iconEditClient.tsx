import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Client } from "../../../Types/types";
import {
  fetchClients,
  FindClientByIdClientSlice,
  UpdateClientSlice,
} from "../../../features/Clinets/ClinetsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function EditFromCLientTableIConForMobile({
  ClientId,
}: {
  ClientId: number;
}) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const ClientData = useAppSelector((state) => state.clients.client);

  const [client, setClient] = useState<Client>(ClientData as Client);

  const handleClickOpen = () => {
    dispatch(FindClientByIdClientSlice(ClientId));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClient((prevClient: Client) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleAddClientButton = () => {
    // console.log(client);
    dispatch(UpdateClientSlice(client)).then(() => {
      dispatch(fetchClients());
    });
  };

  useEffect(() => {
    if (open && ClientData) {
      setClient(ClientData);
    }
    // Commented out console.log
    // console.log("From the component edit ixon useEffect ", ClientData);
  }, [ClientData, open]);

  return (
    <React.Fragment>
      <IconButton
        onClick={() => {
          handleClickOpen();
        }}
      >
        <EditIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            // const formJson = Object.fromEntries((formData as any).entries());
            // const email = formJson.email;
            // Commented out console.log
            // console.log("fromSumbet : ", email);
            // console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Clinet with ID : {client.id} </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={client.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={client.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={client.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Account Number"
            name="accountNumber"
            value={client.accountNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={client.pincode}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Account Balance"
            name="accountBalance"
            type="number"
            value={client.accountBalance}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAddClientButton();
            }}
            variant="contained"
            sx={{ fontWeight: "bold" }}
            type="submit"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
