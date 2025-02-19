import React, { useState, useEffect         } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import SendIcon from "@mui/icons-material/Send";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import { useAppSelector, useAppDispatch } from "../hooks";
import Deposite from "../components/TransactionComponets/Deposite";
import Withdraw from "../components/TransactionComponets/Withdraw";
import Transfer from "../components/TransactionComponets/Transfer";
import ShowClientCardFromATM from "../components/ATMComponents/ShowClientCardFromATM";
import {FindClientByIdClientSlice} from "../features/Clinets/ClinetsSlice";
import { FindClientByEmailAndPINCODEClientSlice } from "../features/Clinets/ClinetsSlice";
  import {  ClientLogin} from "../Types/types";
import { useNavigate } from "react-router-dom";
import ClientLogOut from "../components/LogOut/CLientLogOut";

// Add this sample client data
// const sampleClient = {
//   id: 1001,
//   firstName: "John",
//   lastName: "Doe",
//   accountNumber: "1234-5678-9012-3456",
// };

export default function ATMPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const client = sampleClient;
  const client = useAppSelector((state) => state.clients.client);
  const CurrentClient = useAppSelector((state) => state.clients.CurrentClient);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [clientIdFormLoaclStorage, setClientIdFormLoaclStorage] = useState<number>(0);  
 

  useEffect(() => {
    
    const clientId = localStorage.getItem("currentClientID");
    if (clientId !== null) {
      const parsedClientId = parseInt(clientId);
      setClientIdFormLoaclStorage(parsedClientId);
      dispatch(FindClientByIdClientSlice(parsedClientId));
      console.log(parsedClientId);
      console.log(client);

          }  
          else{
           navigate("/");
          }
  }, [clientIdFormLoaclStorage]);


  useEffect(() => {

   
      dispatch(FindClientByEmailAndPINCODEClientSlice({
        email: client?.email,
        pincode: client?.pincode
      } as ClientLogin));     
      console.log("from useEffect ATM currentClient:", CurrentClient);
    
    
  }, [client]);

  const ATMOptions = [
    {
      title: "Deposit",
      icon: <PaymentsIcon sx={{ fontSize: 50, color: "#059669" }} />,
      bgColor: "#ECFDF5",
      textColor: "#065F46",
      transaction: <Deposite selectedClientID={client?.id ?? 0} />
    },
    {
      title: "Withdraw",
      icon: <AccountBalanceIcon sx={{ fontSize: 50, color: "#DC2626" }} />,
      bgColor: "#FEF2F2",
      textColor: "#991B1B",
      transaction: <Withdraw selectedClientID={client?.id ?? 0} />
    },
    {
      title: "Transfer",
      icon: <SendIcon sx={{ fontSize: 50, color: "#2563EB" }} />,
      bgColor: "#EFF6FF",
      textColor: "#1E40AF",
      transaction: <Transfer selectedClientID={client?.id ?? 0} />
    },
    {
      title: "Balance",
      icon: (
        <AccountBalanceWalletIcon sx={{ fontSize: 50, color: "#D97706" }} />
      ),
      bgColor: "#FEF3C7",
      textColor: "#92400E",
      transaction: <ShowClientCardFromATM selectedClientID={client?.id ?? 0} />
    },
  ];



  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
   
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      >
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              mb: 4,
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            ATM Services
          </Typography>

          {client && (
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                p: 4,
                borderRadius: 3,
                backdropFilter: "blur(10px)",
                maxWidth: "600px",
                margin: "0 auto",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#3B82F6",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                }}
              >
                <PersonIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#E2E8F0",
                    fontWeight: "bold",
                    mb: 1,
                    letterSpacing: "0.5px",
                  }}
                >
                  {client.firstName} {client.lastName}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#94A3B8",
                    mb: 1,
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                  }}
                >
                  ID: #{client.id}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#94A3B8",
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                  }}
                >
                  Account: {client.accountNumber}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Grid container spacing={3}>
          {ATMOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                
                sx={{
                  bgcolor: option.bgColor,
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRadius: 3,
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                      position: "relative",
                    }}
                  >
                    {option.transaction}
                    {option.icon}
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      sx={{
                        color: option.textColor,
                        fontWeight: "bold",
                      }}
                    >
                      {option.title}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <ClientLogOut />  
    </Container>
  );
}
