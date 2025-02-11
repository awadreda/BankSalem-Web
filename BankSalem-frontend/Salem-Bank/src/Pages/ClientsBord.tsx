import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchClients } from "../features/Clinets/ClinetsSlice";
import ClientTable from "../components/ClientsComponets/ClientsTable";
import IconEditClient from "../components/ClientsComponets/ClientsCardsList/iconEditClient";

export default function ClientsBord() {
  const dispatch = useAppDispatch();
  const ClientsAPI = useAppSelector((state) => state.clients);
  const clients = ClientsAPI.clients;

  const [stats, setStats] = useState({
    totalClients: 0,
    totalBalance: 0,
    averageBalance: 0,
  });

  useEffect(() => {
    if (ClientsAPI.state === "idle") {
      dispatch(fetchClients());
    }

    if (clients.length > 0) {
      const totalBalance = clients.reduce(
        (sum, client) => sum + client.accountBalance,
        0
      );
      setStats({
        totalClients: clients.length,
        totalBalance: totalBalance,
        averageBalance: totalBalance / clients.length,
      });
    }
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#2563EB", fontWeight: "bold" }}
      >
        Clients Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#EFF6FF", height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PeopleIcon sx={{ color: "#2563EB", mr: 2, fontSize: 40 }} />
                <div>
                  <Typography variant="h6" color="#1E40AF">
                    Total Clients
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ mt: 1, color: "#2563EB", fontWeight: "bold" }}
                  >
                    {stats.totalClients}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#ECFDF5", height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountBalanceWalletIcon
                  sx={{ color: "#059669", mr: 2, fontSize: 40 }}
                />
                <div>
                  <Typography variant="h6" color="#065F46">
                    Total Balance
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ mt: 1, color: "#059669", fontWeight: "bold" }}
                  >
                    ${stats.totalBalance.toLocaleString()}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#FEF3C7", height: "100%" }}>
            <CardContent >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUpIcon
                  sx={{ color: "#D97706", mr: 2, fontSize: 40 }}
                />
                <div>
                  <Typography variant="h6" color="#92400E">
                    Average Balance
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ mt: 1, color: "#D97706", fontWeight: "bold" }}
                  >
                    ${stats.averageBalance.toLocaleString()}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ClientTable />
    </div>
  );
}
