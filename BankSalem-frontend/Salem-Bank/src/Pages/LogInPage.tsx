import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserLogin, ClientLogin, LogType } from "../Types/types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getUserByUserNameandPassWord } from "../features/Users/UsersSlice";
import { FindClientByEmailAndPINCODEClientSlice } from "../features/Clinets/ClinetsSlice";
import {
  SaveCurrentUserIDINLocalStorage,
  SaveCurrentClientIDINLocalStorage,
} from "../Global/CurrentUserAndClent";
import { registerLogSlice } from "../features/Logs/LogsSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PinIcon from '@mui/icons-material/Pin';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const LogInPage = () => {
  const [username, setUsername] = useState("AwadReda");
  const [password, setPassword] = useState("1234");
  const [email, setEmail] = useState("Aly@a.com");
  const [pinCode, setPinCode] = useState("F10");
  const [userType, setUserType] = useState("Admin");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.CurrentUser);
  const client = useAppSelector((state) => state.clients.CurrentClient);
  const userStatus = useAppSelector((state) => state.users.status);
  const clientStatus = useAppSelector((state) => state.clients.status);
  const [logClicked, setLogClicked] = useState(false);

  const LogInUser = () => {
    const userLogin: UserLogin = { userName: username, password: password };
    dispatch(getUserByUserNameandPassWord(userLogin)).then(() => {
      if (user !== null) {
        console.log("Logging in with:", { username, password });
        navigate("/dashboard");
      } else {
        console.log("Invalid username or password");
      }
    });
  };

  useEffect(() => {
    if (userType === "Admin" && logClicked) {
      dispatch(getUserByUserNameandPassWord({ userName: username, password: password }));
      if (user !== null) {
        const logRegist: LogType = { userID: user.user_ID, logTypeID: 1 };
        dispatch(registerLogSlice(logRegist));
        SaveCurrentUserIDINLocalStorage(user.user_ID);
        navigate("/dashboard");
      }
    } else if (userType === "Client" && logClicked) {
      dispatch(FindClientByEmailAndPINCODEClientSlice({ email, pincode: pinCode }));
      if (client !== null) {
        SaveCurrentClientIDINLocalStorage(client.id);
        navigate("/clientATM");
      }
    }
  }, [user, client]);

  const LogInClient = () => {
    const clientLogin: ClientLogin = { email, pincode: pinCode };
    dispatch(FindClientByEmailAndPINCODEClientSlice(clientLogin)).then(() => {
      if (client !== null && !(client.id <= 0)) {
        navigate("/clientATM");
      } else {
        console.log("Invalid email or pincode");
      }
    });
  };

  const handleLogin = () => {
    if (userType === "Admin") {
      LogInUser();
    } else {
      LogInClient();
    }
  };

  const isLoading = userStatus === "loading" || clientStatus === "loading";
  const isFailed = userStatus === "failed" || clientStatus === "failed";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      }}
    >
      <Container component="main" maxWidth="xs">
        <StyledPaper>
          <Typography variant="h4" align="center" sx={{ mb: 2, color: "#1976d2", fontWeight: 'bold' }}>
            Bank Salem
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 3, color: '#555' }}>
            Log In
          </Typography>
          <Box component="form" noValidate onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <RadioGroup
              row
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              sx={{ mb: 2, justifyContent: 'center' }}
            >
              <FormControlLabel 
                value="Admin" 
                control={<Radio color="primary" />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AdminPanelSettingsIcon sx={{ mr: 1, color: '#1976d2' }} />
                    Admin
                  </Box>
                }
              />
              <FormControlLabel 
                value="Client" 
                control={<Radio color="primary" />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1, color: '#1976d2' }} />
                    Client
                  </Box>
                }
              />
            </RadioGroup>
            <TextField
              margin="normal"
              required
              fullWidth
              label={userType === "Admin" ? "Username" : "Email"}
              value={userType === "Admin" ? username : email}
              onChange={(e) => userType === "Admin" ? setUsername(e.target.value) : setEmail(e.target.value)}
              autoFocus
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {userType === "Admin" ? <AccountCircleIcon color="primary" /> : <EmailIcon color="primary" />}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label={userType === "Admin" ? "Password" : "PINCODE"}
              type="password"
              value={userType === "Admin" ? password : pinCode}
              onChange={(e) => userType === "Admin" ? setPassword(e.target.value) : setPinCode(e.target.value)}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {userType === "Admin" ? <LockIcon color="primary" /> : <PinIcon color="primary" />}
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: "#1976d2", 
                '&:hover': {
                  bgcolor: "#115293"
                },
                height: '48px',
                borderRadius: '24px'
              }}
              disabled={isLoading}
              onClick={() => setLogClicked(true)}
              startIcon={<LoginIcon />}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
            {isFailed && (
              <Typography color="error" align="center">
                Login failed. Please try again.
              </Typography>
            )}
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default LogInPage;
