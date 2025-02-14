import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { User } from "../../Types/types";
import { createUser, getAllUsers } from "../../features/Users/UsersSlice";
import { useAppDispatch } from "../../hooks";
import { Card, CardContent, Typography, Box } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuItem from '@mui/material/MenuItem';

export default function AddUser() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const [user, setUser] = React.useState<User>({
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
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    if (name === 'permission') {
      const numValue = parseInt(value);
      if (isNaN(numValue) || numValue < 1 || numValue > 3) {
        // Only allow valid numbers between 1-3 for permission
        return;
      }
      setUser((prevUser: User) => ({
        ...prevUser,
        [name]: numValue,
      }));
    } else {
      setUser((prevUser: User) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleAddUserButton = () => {
    console.log("user from addUser : ", user);
    dispatch(createUser(user)).then(() => {
      dispatch(getAllUsers());
      handleClose();
    });
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          bgcolor: "#1E40AF",
          mb: 2,
          maxWidth: 345,
          transition: "transform 0.3s, box-shadow 0.3s, background-color 0.5s",
          "&:hover": {
            transform: "translateY(-3px)",

            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            bgcolor: "#d0dff4",
            "& .MuiTypography-root": {
              color: "#1E40AF",
            },
            "& .MuiSvgIcon-root": {
              color: "#1E40AF",
            },
            "& .MuiButton-root": {
              bgcolor: "#1E40AF",
              color: "#EFF6FF",
              "&:hover": {
                bgcolor: "#1E3A8A",
              },
            },
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AdminPanelSettingsIcon
              sx={{ color: "#EFF6FF", mr: 2, fontSize: 40 }}
            />
            <Typography variant="h6" color="#EFF6FF">
              Add New User
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#EFF6FF",
              transition: "background-color 0.5s",
              color: "#1E40AF",
              "&:hover": {
                bgcolor: "#F1F5F9",
              },
              padding: "8px 16px",
              fontWeight: "bold",
              width: "100%",
            }}
            onClick={handleClickOpen}
          >
            Add User
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleAddUserButton();
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#EFF6FF",
            color: "#1E40AF",
          }}
        >
          <AdminPanelSettingsIcon sx={{ mr: 2, fontSize: 32 }} />
          Add New User
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            label="Username"
            name="userName"
            value={user.userName}
            onChange={(event) => handleChange(event as React.ChangeEvent<HTMLInputElement>)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={(event) => handleChange(event as React.ChangeEvent<HTMLInputElement>)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Permission Level"
            name="permission"
            value={user.permission}
            onChange={(event) => handleChange(event as React.ChangeEvent<HTMLInputElement>)}
            fullWidth
            margin="normal"
            required


          >
            <MenuItem value={1}>User</MenuItem>
            <MenuItem value={2}>Admin</MenuItem>
            <MenuItem value={3}>Super Admin</MenuItem>
          </TextField>
          <TextField
            label="First Name"
            name="firstName"
            value={user.firstName}
            onChange={(event) => handleChange(event as React.ChangeEvent<HTMLInputElement>)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={(event) => handleChange(event as React.ChangeEvent<HTMLInputElement>)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={(event) => handleChange(event as React.ChangeEvent<HTMLInputElement>)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={user.phone}
            onChange={(event) => handleChange(event as React.ChangeEvent<HTMLInputElement>)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1E40AF",
              "&:hover": {
                bgcolor: "#1E3A8A",
              },
              fontWeight: "bold",
            }}
            type="submit"
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
