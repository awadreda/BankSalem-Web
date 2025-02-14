import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserLogin } from '../Types/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserByUserNameandPassWord } from '../features/Users/UsersSlice';

const LogInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useAppDispatch();
  const  user  = useAppSelector((state) => state.users.user); 

  const handleLogin = () => {
    // Handle login logic here

    const userLogin: UserLogin = {
      userName: username,
      password: password,
    };
    dispatch(getUserByUserNameandPassWord(userLogin));

  if(user)
    {
        console.log('Logging in with:', { username, password });
        navigate("/dashboard"); // Navigate to another page on successful login 

    }   
    else
    {
      console.log('Invalid username or password');
    }

    // if (username === 'admin' && password === 'admin') { 
    //   console.log('Logging in with:', { username, password });
    //   navigate("/dashboard"); // Navigate to another page on successful login
    // } else {
    //   console.log('Invalid username or password');
    // }
  };

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

          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, bgcolor: "#1976d2" }}
          >
            Log In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogInPage;
