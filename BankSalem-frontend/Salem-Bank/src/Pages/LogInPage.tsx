import React, {  useState, useEffect } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserLogin, ClientLogin } from '../Types/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import {  getUserByUserNameandPassWord } from '../features/Users/UsersSlice';
import { FindClientByEmailAndPINCODEClientSlice } from '../features/Clinets/ClinetsSlice';
import { SaveCurrentUserIDINLocalStorage, SaveCurrentClientIDINLocalStorage } from '../Global/CurrentUserAndClent';
const LogInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Admin'); // Set default userType to 'Admin'
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.CurrentUser); 
  const client = useAppSelector((state) => state.clients.CurrentClient);
  const userStatus = useAppSelector((state) => state.users.status);
  const clientStatus = useAppSelector((state) => state.clients.status);
  const [logClicked, setLogClicked] = useState(false);

  const LogInUser = () => {
     const userLogin: UserLogin = {
     userName: username,
     password: password,
    };
    dispatch(getUserByUserNameandPassWord(userLogin)).then(() => {
      console.log("userStatus:", userStatus);
      console.log("user:", user);
      if (user !== null) {
        console.log('Logging in with:', { username, password });
        console.log('User:', user);
        navigate("/dashboard"); // Navigate to another page on successful login 
      } else {
        console.log('Invalid username or password') ;
      }
      console.log("userStatus:", userStatus);
      console.log("user:", user);
    });
  };

  useEffect(() => {
   if(userType === "Admin" && logClicked) {
    console.log("Logging in as Admin");
     dispatch(getUserByUserNameandPassWord({userName: username, password: password}));  
     console.log("userStatus:", userStatus);
     console.log("user:", user);
     if(user !== null) {
      console.log("Logging in with:", { username, password });
      console.log("User:", user);
      navigate("/dashboard"); // Navigate to another page on successful login 
      SaveCurrentUserIDINLocalStorage(user.user_ID);
     } else {
      console.log("Invalid username or password") ;
     }
   } else if(userType === "Client" && logClicked) {
     console.log("Logging in as Client");
     dispatch(FindClientByEmailAndPINCODEClientSlice({email: username, pincode: password}));
     console.log("clientStatus:", clientStatus);
     console.log("client:", client);
     if(client !== null) {
       console.log("Logging in with:", { username, password });
       console.log("Client:", client);
       navigate("/clientATM"); // Navigate to another page on successful login
       SaveCurrentClientIDINLocalStorage(client.id);
    } else {
      console.log("Invalid email or pincode");
    }
   }
  }, [ user, client]); 

      

    

  const LogInClient = () => {
    const clientLogin: ClientLogin = {
     email: username,
     pincode: password,
    };
    dispatch(FindClientByEmailAndPINCODEClientSlice(clientLogin)).then(() => {
      console.log("clientStatus:", clientStatus);
       if (client !== null) {
         console.log("Logging in with:", { username, password });
         console.log("Client:", client);
         navigate("/clientATM"); // Navigate to another page on successful login
       } else {
         console.log("Invalid email or pincode");
       }
    });
  }

    
  
  const handleLogin = () => {
    if (userType === 'Admin') {
      LogInUser();
      if(user !== null) {
      }
    } else {
      LogInClient();
      if(client !== null) {
      }
    }


}

  


  const isLoading = userStatus === 'loading' || clientStatus === 'loading';
  const isFailed = userStatus === 'failed' || clientStatus === 'failed';

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ mb: 2, color: "#1976d2" }}>
          Bank Salem
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 3 }}>
          Log In
        </Typography>
        <Box component="form" noValidate onSubmit={
          (e) => {
            e.preventDefault();
            handleLogin();
          }
        }>
          <RadioGroup
            row
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="Client" control={<Radio />} label="Client" />
          </RadioGroup>
          <TextField
            margin="normal"
            required
            fullWidth
            label={userType === 'Admin' ? 'Username' : 'Email'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={userType === 'Admin' ? 'Password' : 'PINCODE'}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, bgcolor: "#1976d2" }}
            disabled={isLoading}
            onClick={() => setLogClicked(true)}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </Button>
          {isFailed && <Typography color="error">Login failed. Please try again.</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default LogInPage;
