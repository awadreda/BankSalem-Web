/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from "react";
import {
  Paper,
 
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
 
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks";
import { getAllUsers } from "../features/Users/UsersSlice";
import AddUser from "../components/UsersComponets/AddUser";
import EditUser from "../components/UsersComponets/EditUser";
import DeleteUser from "../components/UsersComponets/DeleteUser";
import ShowUserProfile from "../components/UsersComponets/ShowUserProfile";
import { useNavigate } from "react-router-dom";

export default function AdminBord() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // @ts-ignore
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  // @ts-ignore
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();
  const stateUsers = useAppSelector((state) => state.users);

  const users = stateUsers?.users || [];
  // const status = stateUsers?.status;
  // const error = stateUsers?.error;
  const currentUser = stateUsers?.CurrentUser;
  const navigate = useNavigate();

  const refetchUsers = () => {
    dispatch(getAllUsers());
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // @ts-ignore
  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalUsers: 0,
    superAdmins: 0,
  });

  useEffect(() => {
    if (currentUser == null) {
      navigate("/");
    }

    refetchUsers();
    // console.log("users : ", users);
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
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // @ts-ignore
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

  const handleRowClick = (
    event: React.MouseEvent<HTMLElement>,
    userId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };
  // @ts-ignore
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  // const handleEdit = (userId: number) => {
  //   // console.log("Edit user:", userId);
  // };

  // const handleDelete = (userId: number) => {
  //   // console.log("Delete user:", userId);
  // };

  // const handleAddUser = () => {
  //   // console.log("Add new user");
  // };

  return (
    <div style={{ padding: "24px" }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#1E40AF", fontWeight: "bold" }}
      >
        Admin Dashboard
      </Typography>
      {/* 
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
      </Grid> */}

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
                      onClick={(event) => handleRowClick(event, user.user_ID)}
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
                        <ShowUserProfile selectedUserId={user.user_ID} />
                        <EditUser userId={user.user_ID} onClose={() => {}} />

                        <DeleteUser userId={user.user_ID} onClose={() => {}} />
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          marginTop: "20px",
        }}
      >
        <AddUser />
      </Box>
    </div>
  );
}
