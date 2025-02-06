import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  IconButton,
  Button,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SecurityIcon from "@mui/icons-material/Security";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getAllUsers } from "../features/Users/UsersSlice";
import AddUser from "../components/UsersComponets/AddUser";

export default function AdminBord() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const stateUsers = useAppSelector((state) => state.users);

  const users = stateUsers?.users || [];
  const status = stateUsers?.status;
  const error = stateUsers?.error;

  const refetchUsers = () => {
    dispatch(getAllUsers());
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalUsers: 0,
    superAdmins: 0,
  });

  useEffect(() => {
    refetchUsers();
    console.log("users : ", users);
  }, []);

  useEffect(() => {
    // Calculate stats when users changes
    if (users?.length) {
      setStats({
        totalAdmins: users.filter((user) => user.permission >= 1).length,
        totalUsers: users.length,
        superAdmins: users.filter((user) => user.permission === 2).length,
      });
    }
  }, [users]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPermissionLabel = (permission: number) => {
    switch (permission) {
      case 2:
        return "Super Admin";
      case 1:
        return "Admin";
      default:
        return "User";
    }
  };

  const handleEdit = (userId: number) => {
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId: number) => {
    console.log("Delete user:", userId);
  };

  const handleAddUser = () => {
    console.log("Add new user");
  };

  return (
    <div style={{ padding: "24px" }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#1E40AF", fontWeight: "bold" }}
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#EFF6FF", height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AdminPanelSettingsIcon
                  sx={{ color: "#1E40AF", mr: 2, fontSize: 40 }}
                />
                <div>
                  <Typography variant="h6" color="#1E40AF">
                    Total Admins
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ mt: 1, color: "#2563EB", fontWeight: "bold" }}
                  >
                    {stats.totalAdmins}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#F0FDF4", height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <GroupIcon sx={{ color: "#15803D", mr: 2, fontSize: 40 }} />
                <div>
                  <Typography variant="h6" color="#15803D">
                    Total Users
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ mt: 1, color: "#16A34A", fontWeight: "bold" }}
                  >
                    {stats.totalUsers}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#FEF2F2", height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SecurityIcon sx={{ color: "#991B1B", mr: 2, fontSize: 40 }} />
                <div>
                  <Typography variant="h6" color="#991B1B">
                    Super Admins
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ mt: 1, color: "#DC2626", fontWeight: "bold" }}
                  >
                    {stats.superAdmins}
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {!isMobile && (
                  <TableCell
                    sx={{
                      bgcolor: "#1E40AF",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    ID
                  </TableCell>
                )}
                <TableCell
                  sx={{
                    bgcolor: "#1E40AF",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                {!isMobile && (
                  <TableCell
                    sx={{
                      bgcolor: "#1E40AF",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell
                    sx={{
                      bgcolor: "#1E40AF",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Phone
                  </TableCell>
                )}
                <TableCell
                  sx={{
                    bgcolor: "#1E40AF",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow
                      hover
                      key={user.user_ID}
                      sx={{
                        "&:nth-of-type(odd)": { bgcolor: "#F8FAFC" },
                        transition: "all 0.2s",
                        "&:hover": { bgcolor: "#F1F5F9" },
                      }}
                    >
                      {!isMobile && <TableCell>{user.user_ID}</TableCell>}
                      <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                      {!isMobile && <TableCell>{user.email}</TableCell>}
                      {!isMobile && <TableCell>{user.phone}</TableCell>}
                      <TableCell>
                        <IconButton
                          onClick={() => handleEdit(user.user_ID)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(user.user_ID)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ bgcolor: "#F8FAFC" }}
        />
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 ,marginTop: "20px" }}>
        <AddUser />
      </Box>
    </div>

  );
}
