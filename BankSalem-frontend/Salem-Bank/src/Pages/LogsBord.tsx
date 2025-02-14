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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Box
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import { useAppDispatch, useAppSelector } from '../hooks';

import { fetchLogRegisterList } from '../features/Logs/LogsSlice';
import { LogRegister } from '../Types/types';

export default function LogsBord() {
   const [stats, setStats] = useState({
    totalActions: 0,
    uniqueUsers: 0,
    todayActions: 0
  });
  const [sortOrder, setSortOrder] = useState('asc'); // State for sort order
  const dispatch = useAppDispatch();
  const logs = useAppSelector((state) => state.logs.logs);

  useEffect(() => {
    dispatch(fetchLogRegisterList());
  }, [dispatch]);

  useEffect(() => {
    if (logs.length > 0) {
      // Calculate stats
      setStats({
        totalActions: logs.length,
        uniqueUsers: new Set(logs.map(log => log.userID)).size,
        todayActions: logs.filter(log => 
          new Date(log.logTime).toDateString() === new Date().toDateString()
        ).length
      });
    }
  }, [logs]);

  // Sort logs based on the selected order
  const sortedLogs = [...logs].sort((a, b) => {
    const dateA = new Date(a.logTime).getTime();
    const dateB = new Date(b.logTime).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const logsList = sortedLogs.map((log: LogRegister) => (
    <TableRow key={log.logID} hover>
      <TableCell>{log.logID}</TableCell>
      <TableCell>
        <Typography sx={{ color: log.logeTypeName === "LogIn" ? "#2e7d32" : log.logeTypeName === "LogOut" ? "#c62828" : "inherit" }}>
          {log.logeTypeName || "Unknown Action"}
        </Typography>
      </TableCell>
      <TableCell>{log.userID}</TableCell>
      <TableCell>{log.userName || "N/A"}</TableCell>
      <TableCell>{new Date(log.logTime).toLocaleString()}</TableCell>
    </TableRow>
  ));

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" sx={{ mb: 4, color: "#1976d2" }}>
        System Activity Logs
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#e3f2fd" }}>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <HistoryIcon sx={{ color: "#1565c0", mr: 1 }} />
                <Typography variant="h6">Total Actions</Typography>
              </div>
              <Typography variant="h4" sx={{ mt: 2, color: "#1565c0" }}>
                {stats.totalActions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#e8f5e9" }}>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PersonIcon sx={{ color: "#2e7d32", mr: 1 }} />
                <Typography variant="h6">Unique Users</Typography>
              </div>
              <Typography variant="h4" sx={{ mt: 2, color: "#2e7d32" }}>
                {stats.uniqueUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#fff3e0" }}>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <EventIcon sx={{ color: "#e65100", mr: 1 }} />
                <Typography variant="h6">Today's Actions</Typography>
              </div>
              <Typography variant="h4" sx={{ mt: 2, color: "#e65100" }}>
                {stats.todayActions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        {/* <FormLabel component="legend" sx={{ color: "#1976d2" }}>Sort by Date</FormLabel> */}
        <RadioGroup row value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <FormControlLabel value="asc" control={<Radio />} label={<Typography sx={{ color: "#1976d2" }}>Ascending (earliest to latest)         </Typography>} />
          <FormControlLabel value="desc" control={<Radio />} label={<Typography sx={{ color: "#1976d2" }}>Descending (latest to earliest)  </Typography>} />
        </RadioGroup>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell>ID</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logsList}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
