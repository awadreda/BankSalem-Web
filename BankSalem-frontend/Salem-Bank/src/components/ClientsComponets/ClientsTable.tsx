import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchClients } from "../../features/Clinets/ClinetsSlice";
import AddClient from "./AddClient";
import RowClineMenue from "./RowClineMenue";
import { useTheme, useMediaQuery, Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import ClientCard from "./ClientsCardsList/ClientCard";

export interface Client {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  accountNumber: string | null;
  pincode: string | null;
  accountBalance: number;
}

interface Column {
  id: keyof Client;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "Client ID", minWidth: 50 },
  { id: "firstName", label: "Full Name", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "accountNumber", label: "Account Number", minWidth: 100 },
  {
    id: "accountBalance",
    label: "Account Balance",
    minWidth: 100,
    format: (value: number) =>
      value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
  },
];

// Sample client data remains the same
// @ts-ignore
const clientsSample: Client[] = [
  // ... previous sample data
];

export default function ClientsTable() {
  const [page, setPage] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<{
    element: HTMLElement | null;
    position: { top: number; left: number } | null;
  }>({ element: null, position: null });
  const [selectedClientID, setSelectedClientId] = React.useState<number>(-1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const ClientsAPI = useAppSelector((state) => state.clients);

  let clients = useMemo(() => ClientsAPI.clients, [ClientsAPI.clients]);

  const filteredClients = useMemo(() => {
    return clients.filter(client => 
      client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  const momoizedCLientCard = useMemo(() => {
    return filteredClients.map((client) => (
      <ClientCard key={client.id} client={client} />
    ));
  }, [filteredClients]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (ClientsAPI.state === "idle") {
      dispatch(fetchClients());
    }
  }, []);

  const handleClientRowClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    console.log("Bounding Rect:", rect);
    console.log("Window ScrollY:", window.scrollY);

    setAnchorEl({
      element: event.currentTarget, // Ensure the right element is used
      position: {
        top: rect.top + window.scrollY + rect.height / 2, // Center vertically
        left: rect.left + window.scrollX + rect.width / 2, // Center horizontally
      },
    });

    setSelectedClientId(id);
  };

  const handleClose = () => {
    setAnchorEl({ element: null, position: null });
    setSelectedClientId(-1);
    RefreshClients();
  };

  const RefreshClients = () => {
    dispatch(fetchClients());
  };

  const handleEdit = (selectedClientID: number) => {
    console.log("Edit client:", selectedClientID);
  };

  const handleDelete = (selectedClientID: number) => {
    console.log("Delete client:", selectedClientID);
  };

  return (
    <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: 2 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            color: "#2563EB",
            fontWeight: "bold",
          }}
        >
          Clients List
        </Typography>
        <AddClient />
      </div>

      <TextField
        variant="outlined"
        placeholder="Search Clients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: "20px", width: "100%" }}
      />

      {isMobile || isTablet ? (
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          {momoizedCLientCard}
        </div>
      ) : (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          top: 0,
                          minWidth: column.minWidth,
                          backgroundColor: "#3B82F6",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredClients
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((client) => (
                      <TableRow
                        onClick={(event) =>
                          handleClientRowClick(event, client.id)
                        }
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={client.id}
                        sx={{ transition: ".3s" }}
                      >
                        {columns.map((column) => {
                          const value =
                            column.id === "firstName"
                              ? `${client.firstName} ${client.lastName}`
                              : client[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ backgroundColor: "inherit" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredClients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ backgroundColor: "#BFDBFE" }}
            />
          </Paper>
        </>
      )}
      <RowClineMenue
        anchorEl={anchorEl.element}
        // open={Boolean(anchorEl.element)}
        onClose={handleClose}
        selectedClientID={selectedClientID}
        onEdit={() => handleEdit(selectedClientID)}
        onDelete={() => handleDelete(selectedClientID)}
      />
    </Box>
  );
}
