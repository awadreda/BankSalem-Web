import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  useTheme,
  useMediaQuery
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchClients } from "../features/Clinets/ClinetsSlice";

export default function ClientsBord() {
  const dispatch = useAppDispatch();
  const ClientsAPI = useAppSelector((state) => state.clients);
  const clients = ClientsAPI.clients;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [stats, setStats] = useState({
    totalClients: 0,
    totalBalance: 0,
    averageBalance: 0
  });

  useEffect(() => {
    if (ClientsAPI.state === "idle") {
      dispatch(fetchClients());
    }

    if (clients.length > 0) {
      const totalBalance = clients.reduce((sum, client) => sum + client.accountBalance, 0);
      setStats({
        totalClients: clients.length,
        totalBalance: totalBalance,
        averageBalance: totalBalance / clients.length
      });
    }
  }, [clients, ClientsAPI.state, dispatch]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#2563EB', fontWeight: 'bold' }}>
        Clients Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#EFF6FF', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ color: '#2563EB', mr: 2, fontSize: 40 }} />
                <div>
                  <Typography variant="h6" color="#1E40AF">Total Clients</Typography>
                  <Typography variant="h4" sx={{ mt: 1, color: '#2563EB', fontWeight: 'bold' }}>
                    {stats.totalClients}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#ECFDF5', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountBalanceWalletIcon sx={{ color: '#059669', mr: 2, fontSize: 40 }} />
                <div>
                  <Typography variant="h6" color="#065F46">Total Balance</Typography>
                  <Typography variant="h4" sx={{ mt: 1, color: '#059669', fontWeight: 'bold' }}>
                    ${stats.totalBalance.toLocaleString()}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#FEF3C7', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: '#D97706', mr: 2, fontSize: 40 }} />
                <div>
                  <Typography variant="h6" color="#92400E">Average Balance</Typography>
                  <Typography variant="h4" sx={{ mt: 1, color: '#D97706', fontWeight: 'bold' }}>
                    ${stats.averageBalance.toLocaleString()}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {!isMobile && <TableCell sx={{ bgcolor: '#3B82F6', color: 'white', fontWeight: 'bold' }}>ID</TableCell>}
                <TableCell sx={{ bgcolor: '#3B82F6', color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                {!isMobile && <TableCell sx={{ bgcolor: '#3B82F6', color: 'white', fontWeight: 'bold' }}>Email</TableCell>}
                <TableCell sx={{ bgcolor: '#3B82F6', color: 'white', fontWeight: 'bold' }}>Account Number</TableCell>
                <TableCell sx={{ bgcolor: '#3B82F6', color: 'white', fontWeight: 'bold' }}>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client) => (
                  <TableRow 
                    hover 
                    key={client.id}
                    sx={{ 
                      '&:nth-of-type(odd)': { bgcolor: '#F3F4F6' },
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { bgcolor: '#E5E7EB' }
                    }}
                  >
                    {!isMobile && <TableCell>{client.id}</TableCell>}
                    <TableCell>{`${client.firstName} ${client.lastName}`}</TableCell>
                    {!isMobile && <TableCell>{client.email}</TableCell>}
                    <TableCell>{client.accountNumber}</TableCell>
                    <TableCell sx={{ color: client.accountBalance > 0 ? '#059669' : '#DC2626', fontWeight: 'bold' }}>
                      ${client.accountBalance.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ bgcolor: '#BFDBFE' }}
        />
      </Paper>
    </div>
  );
}
