import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Client } from "../../Types/types";
import { addClinet, fetchClients } from "../../features/Clinets/ClinetsSlice";
import { useAppDispatch } from "../../hooks";

export default function AddClient() {

  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const [client, setClient] = React.useState<Client>({
    id: 5,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    accountNumber: "",
    pincode: "",
    accountBalance: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClient((prevClient:Client) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleAddClientButton = () => {
    // console.log(client);
    dispatch(addClinet(client)).then(() => {
    dispatch(fetchClients());});
  };


  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{ padding: "6px 8px", fontWeight: "bold" }}
        onClick={handleClickOpen}
      >
        Add Client
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add New Clinet</DialogTitle>
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
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddClientButton} variant="contained" sx={{ fontWeight: "bold" }} type="submit">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
