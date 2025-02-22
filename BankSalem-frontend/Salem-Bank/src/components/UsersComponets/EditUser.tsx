import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { User } from "../../Types/types";
import { getAllUsers, getUserById, updateUser } from "../../features/Users/UsersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function EditUser({
  userId,
  onClose,
}: {
  userId: number;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const userData = useAppSelector((state) => state.users.user);

  const [user, setUser] = useState<User>({
    user_ID: 0,
    userName: "",
    password: "",
    permission: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(getUserById(userId));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser: User) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePermissionChange = (permission: number) => {
    setUser((prevUser: User) => ({
      ...prevUser,
      permission: permission,
    }));
  };

  const handleUpdateUserButton = () => {
    dispatch(updateUser(user)).then(() => {
      dispatch(getAllUsers());
    }).catch(error => {
      console.error("Error updating user:", error);
    });
  };

  useEffect(() => {
    if (open && userData) {
      setUser(userData);
    }
  }, [open, userData]);

  return (
    <React.Fragment>
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        size="small"
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
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit User with ID: {user.user_ID}</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="First Name"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.permission === 1}
                  onChange={() => handlePermissionChange(1)}
                />
              }
              label="Admin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.permission === 2}
                  onChange={() => handlePermissionChange(2)}
                />
              }
              label="Teller"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              onClose();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onClose();
              handleUpdateUserButton();
            }}
            variant="contained"
            sx={{ fontWeight: "bold" }}
            type="submit"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
