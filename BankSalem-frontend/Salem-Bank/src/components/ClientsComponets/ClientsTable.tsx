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
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchClients } from "../../features/Clinets/ClinetsSlice";
import AddClient from "./AddClient";
import RowClineMenue from "./RowClineMenue";

export interface Client {
  id: number; // integer($int32)
  firstName: string | null; // string, nullable: true
  lastName: string | null; // string, nullable: true
  email: string | null; // string, nullable: true
  phone: string | null; // string, nullable: true
  accountNumber: string | null; // string, nullable: true
  pincode: string | null; // string, nullable: true
  accountBalance: number; // number($double)
}

interface Column {
  id: keyof Client; // Use keys from the Client interface
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "Client ID", minWidth: 50 },
  { id: "firstName", label: "Full Name", minWidth: 150 }, // Merged First Name and Last Name
  { id: "email", label: "Email", minWidth: 150 },
  { id: "accountNumber", label: "Account Number", minWidth: 100 },
  {
    id: "accountBalance",
    label: "Account Balance",
    minWidth: 100,
    // align: "right",
    format: (value: number) =>
      value.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
];

// Sample client data
const clientsSample: Client[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    accountNumber: "123456789",
    pincode: "12345",
    accountBalance: 1500.75,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+0987654321",
    accountNumber: "987654321",
    pincode: "54321",
    accountBalance: 2500.5,
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phone: "+1122334455",
    accountNumber: "456789123",
    pincode: "67890",
    accountBalance: 3000.0,
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    phone: "+5566778899",
    accountNumber: "789123456",
    pincode: "13579",
    accountBalance: 4500.25,
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie.davis@example.com",
    phone: "+9988776655",
    accountNumber: "321654987",
    pincode: "24680",
    accountBalance: 5000.0,
  },
  {
    id: 6,
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie.davis@example.com",
    phone: "+9988776655",
    accountNumber: "321654987",
    pincode: "24680",
    accountBalance: 5000.0,
  },
  {
    id: 7,
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie.davis@example.com",
    phone: "+9988776655",
    accountNumber: "321654987",
    pincode: "24680",
    accountBalance: 5000.0,
  },
];

export default function ClientsTable() {
  const [page, setPage] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedClientID, setSelectedClientId] = React.useState<number>(-1);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useAppDispatch();

  const ClientsAPI = useAppSelector((state) => state.clients);
  let clients = ClientsAPI.clients;

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
      console.log("From the component", ClientsAPI.clients);
    }
  }, []);

  const handleClientRowClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedClientId(id);

    console.log("Client ID: ", id);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    <div style={{ maxWidth: "900px" }}>
      {/* Header for the Paper */}
      <div
        id="Head-clinetTable"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "25px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            // backgroundColor: "#2563EB",
            color: "#2563EB",
            padding: 2,
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          Clients List
        </Typography>
        <AddClient />
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440, overflowX: "auto" }}>
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
              {clients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client) => {
                  return (
                    <TableRow
                      onClick={(event) =>
                        handleClientRowClick(event, client.id)
                      } // Handle client click
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={client.id}
                      sx={{
                        transition: ".3s",
                      }} // Hover effect
                    >
                      {columns.map((column) => {
                        const value =
                          column.id === "firstName"
                            ? `${client.firstName} ${client.lastName}` // Merge First Name and Last Name
                            : client[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ backgroundColor: "inherit" }} // White background for rows
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <RowClineMenue
            anchorEl={anchorEl}
            onClose={handleClose}
            selectedClientID={selectedClientID}
            onEdit={() => handleEdit(selectedClientID)}
            onDelete={() => handleDelete(selectedClientID)}
            


          />
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: "#BFDBFE" }} // Light blue background for pagination
        />
      </Paper>
    </div>
  );
}
