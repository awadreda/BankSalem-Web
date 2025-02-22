// import ClientsTable from "../components/ClientsComponets/ClientsTable";
// import TransList from "../components/TransactionComponets/TransList";

import  { useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  // Paper,
  Divider,
} from "@mui/material";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import { useTheme } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchClients } from "../features/Clinets/ClinetsSlice";
import { fetchTransactionsSlice } from "../features/Transactions/TransSlice";

const Dashboard = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const totalClients = useAppSelector((state) => state.clients.clients.length);
  const totalBalance = useAppSelector((state) =>
    state.clients.clients.reduce(
      (acc, client) => acc + client.accountBalance,
      0
    )
  );
  const totalTransactions = useAppSelector(
    (state) => state.Transactions.transactions.length
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch clients and transactions data
    dispatch(fetchClients());
    dispatch(fetchTransactionsSlice());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#1976d2", fontWeight: "bold" }}
      >
        Bank Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Clients Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#e3f2fd", height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PeopleIcon sx={{ color: "#1976d2", fontSize: 40, mr: 2 }} />
                <div>
                  <Typography variant="h6" color="#1976d2">
                    Total Clients
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
                    {totalClients}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Balance Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#e8f5e9", height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MonetizationOnIcon
                  sx={{ color: "#2e7d32", fontSize: 40, mr: 2 }}
                />
                <div>
                  <Typography variant="h6" color="#2e7d32">
                    Total Balance
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
                    <Typography
                      variant="h4"
                      sx={{
                        mt: 1,
                        fontWeight: "bold",
                        fontFamily: "Roboto Mono",
                      }}
                    >
                      ${totalBalance.toLocaleString()}
                    </Typography>
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Transactions Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#fff3e0", height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUpIcon
                  sx={{ color: "#d97706", fontSize: 40, mr: 2 }}
                />
                <div>
                  <Typography variant="h6" color="#d97706">
                    Total Transactions
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
                    {totalTransactions}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bank Info Card */}
        <Grid item xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Bank Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                Welcome to Bank Salem, where we prioritize your financial needs.
                Our bank offers a wide range of services including savings
                accounts, loans, and investment options. Our dedicated team is
                here to assist you with all your banking needs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
