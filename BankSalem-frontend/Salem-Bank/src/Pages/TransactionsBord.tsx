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
  CardContent
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  fromAccount?: number;
  toAccount?: number;
  date: string;
}

export default function TransactionsBord() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalTransfers: 0
  });

  useEffect(() => {
    // Fetch transactions from API
    // This is a mock implementation
    const mockTransactions: Transaction[] = [
      {
        id: 1,
        type: 'deposit',
        amount: 1000,
        toAccount: 123456,
        date: '2024-01-15'
      },
      {
        id: 2,
        type: 'withdrawal',
        amount: 500,
        fromAccount: 123456,
        date: '2024-01-16'
      },
      {
        id: 3,
        type: 'transfer',
        amount: 750,
        fromAccount: 123456,
        toAccount: 789012,
        date: '2024-01-17'
      }
    ];

    setTransactions(mockTransactions);

    // Calculate statistics
    const deposits = mockTransactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
    const withdrawals = mockTransactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);
    const transfers = mockTransactions.filter(t => t.type === 'transfer').reduce((sum, t) => sum + t.amount, 0);

    setStats({
      totalDeposits: deposits,
      totalWithdrawals: withdrawals,
      totalTransfers: transfers
    });
  }, []);

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>From Account</TableCell>
              <TableCell>To Account</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell sx={{
                  color: transaction.type === 'deposit' ? '#2e7d32' : 
                         transaction.type === 'withdrawal' ? '#c62828' : '#1565c0'
                }}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.fromAccount || '-'}</TableCell>
                <TableCell>{transaction.toAccount || '-'}</TableCell>
                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
