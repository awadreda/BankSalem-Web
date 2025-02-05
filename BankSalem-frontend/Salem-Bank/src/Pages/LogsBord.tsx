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
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

interface Log {
  id: number;
  action: string;
  userId: number;
  details: string;
  timestamp: string;
}

export default function   LogsBord() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [stats, setStats] = useState({
    totalActions: 0,
    uniqueUsers: 0,
    todayActions: 0
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockLogs: Log[] = [
      {
        id: 1,
        action: 'User Login',
        userId: 101,
        details: 'User successfully logged in',
        timestamp: '2024-01-15 09:30:00'
      },
      {
        id: 2,
        action: 'Transfer',
        userId: 102,
        details: 'Transfer of $500 from account 123 to 456',
        timestamp: '2024-01-15 10:15:00'
      },
      // Add more mock data as needed
    ];

    setLogs(mockLogs);
    
    // Calculate stats
    setStats({
      totalActions: mockLogs.length,
      uniqueUsers: new Set(mockLogs.map(log => log.userId)).size,
      todayActions: mockLogs.filter(log => 
        new Date(log.timestamp).toDateString() === new Date().toDateString()
      ).length
    });
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#1976d2' }}>
        System Activity Logs
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HistoryIcon sx={{ color: '#1565c0', mr: 1 }} />
                <Typography variant="h6">Total Actions</Typography>
              </div>
              <Typography variant="h4" sx={{ mt: 2, color: '#1565c0' }}>
                {stats.totalActions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ color: '#2e7d32', mr: 1 }} />
                <Typography variant="h6">Unique Users</Typography>
              </div>
              <Typography variant="h4" sx={{ mt: 2, color: '#2e7d32' }}>
                {stats.uniqueUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon sx={{ color: '#e65100', mr: 1 }} />
                <Typography variant="h6">Today's Actions</Typography>
              </div>
              <Typography variant="h4" sx={{ mt: 2, color: '#e65100' }}>
                {stats.todayActions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell>ID</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} hover>
                <TableCell>{log.id}</TableCell>
                <TableCell>
                  <Typography sx={{ 
                    color: log.action.includes('Login') ? '#2e7d32' : 
                           log.action.includes('Transfer') ? '#1565c0' : '#333'
                  }}>
                    {log.action}
                  </Typography>
                </TableCell>
                <TableCell>{log.userId}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
