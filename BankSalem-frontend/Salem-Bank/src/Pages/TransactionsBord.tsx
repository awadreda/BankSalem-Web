import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useAppSelector } from '../hooks';
import { useAppDispatch } from '../hooks';
import { Transaction } from '../Types/types';
import { fetchTransactionsSlice } from '../features/Transactions/TransSlice';
import ShowTransactionCard from '../components/TransactionsComponent/ShowTransactions'; // Import the ShowTransactionCard component

export default function TransactionsBord() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalTransfers: 0
  });

  const state = useAppSelector((state) => state.Transactions);
  const dispatch = useAppDispatch();
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const mockTransactions = state.transactions;
  console.log("TransactionsItems from TransactionsBord : ", mockTransactions);
  
  useEffect(() => {
    // Fetch transactions from API
    console.log("TransactionsItems from TransactionsBord : ", mockTransactions);
    dispatch(fetchTransactionsSlice());

    // let mockTransactions = TransactionsItems;
    // setTransactions(mockTransactions);

   
  }, [dispatch]);

  useEffect(() => {
    console.log("TransactionsItems from TransactionsBord : ", mockTransactions); 
     // Calculate statistics
     const deposits = mockTransactions.filter(t => t.transActionTypeName === 'Deposit').reduce((sum, t) => sum + t.amount, 0);
     const withdrawals = mockTransactions.filter(t => t.transActionTypeName === 'WithDraw').reduce((sum, t) => sum + t.amount, 0);
     const transfers = mockTransactions.filter(t => t.transActionTypeName === 'Transfer').reduce((sum, t) => sum + t.amount, 0);
 
     setStats({
       totalDeposits: deposits,
       totalWithdrawals: withdrawals,
       totalTransfers: transfers
     });
      
  }, [ mockTransactions]);


  return (
    <div style={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Transactions Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: '#2e7d32', mr: 1 }} />
                <Typography variant="h6">Total Deposits</Typography>
              </div>
              <Typography variant="h4" sx={{ mt: 2, color: '#2e7d32' }}>
                ${stats.totalDeposits.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#ffebee' }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TrendingDownIcon sx={{ color: '#c62828', mr: 1 }} />
                <Typography variant="h6">Total Withdrawals</Typography>
              </div>
              <Typography variant="h4" sx={{ mt: 2, color: '#c62828' }}>
                ${stats.totalWithdrawals.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CompareArrowsIcon sx={{ color: '#1565c0', mr: 1 }} />
                <Typography variant="h6">Total Transfers</Typography>
              </div>
              <Typography variant="h4" sx={{ mt: 2, color: '#1565c0' }}>
                ${stats.totalTransfers.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <TableContainer sx={{ height: '500px', overflow: 'auto' }} component={Paper}>
        <Table>
          <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: ' #f0f0f0', zIndex: 1 }}>
            <TableRow>
              {isMobile ? (
                <>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Details</TableCell>
                </>
              ) : (
                <>
                  <TableCell>ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>From Account</TableCell>
                  <TableCell>To Account</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Date</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.transActionID}>
                {isMobile ? (
                  <>
                    <TableCell sx={{
                      color: transaction.transActionTypeName === 'deposit' ? '#2e7d32' : 
                             transaction.transActionTypeName === 'withdrawal' ? '#c62828' : 
                             transaction.transActionTypeName === 'transfer' ? '#1565c0' : '#000'
                    }}>
                      {transaction.transActionTypeName ? transaction.transActionTypeName.charAt(0).toUpperCase() + transaction.transActionTypeName.slice(1) : 'Unknown'}
                    </TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton onClick={() => console.log(transaction.transActionID)}>
                        <ShowTransactionCard selectedTransactionID={transaction.transActionID} />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{transaction.transActionID}</TableCell>
                    <TableCell sx={{
                      color: transaction.transActionTypeName === 'deposit' ? '#2e7d32' : 
                             transaction.transActionTypeName === 'withdrawal' ? '#c62828' : 
                             transaction.transActionTypeName === 'transfer' ? '#1565c0' : '#000'
                    }}>
                      {transaction.transActionTypeName ? transaction.transActionTypeName.charAt(0).toUpperCase() + transaction.transActionTypeName.slice(1) : 'Unknown'}
                    </TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.clientID || '-'}</TableCell>
                    <TableCell>{transaction.reciverID ? transaction.reciverID : '-'}</TableCell>
                    <TableCell>{new Date(transaction.transActionDateTime).toLocaleString() || '-'}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
