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
import { Transaction } from "../../Types/types";
import { fetchTransactionsSlice } from "../../features/Transactions/TransSlice";


interface Column {
  id: keyof Transaction;
  label: string;
  minWidth: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number | string) => string;
}

const columns: Column[] = [
{ id: "transActionID", label: "Transaction ID", minWidth: 120 },
{ id: "transActionDateTime", label: "Date Time", minWidth: 170 },
{ id: "transActionTypeName", label: "Type", minWidth: 130 },
{ id: "clientID", label: "From Client ID", minWidth: 130 },
{ id: "reciverID", label: "To Client ID", minWidth: 130 },
{ 
id: "amount", 
label: "Amount", 
minWidth: 120,
format: (value: number | string) => {
if (typeof value === 'number') {
return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
return value.toString();
}
},
{ 
id: "clientAmountBefore", 
label: "Sender Balance Before",
minWidth: 150,
format: (value: number | string) => {
if (typeof value === 'number') {
return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
return value.toString();
}
},
{ 
id: "clientAmountAfter", 
label: "Sender Balance After",
minWidth: 150,
format: (value: number | string) => {
if (typeof value === 'number') {
return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
return value.toString();
}
}
];

// Sample transaction data matching the Transaction interface
const transactionsSample: Transaction[] = [
{
transActionID: 1,
transActionTypeID: 1,
transActionTypeName: "Transfer",
userID: 1,
clientID: 101,
reciverID: 102,
transActionDateTime: "2024-01-15T10:30:00",
amount: 500.00,
clientAmountBefore: 1500.00,
clientAmountAfter: 1000.00,
reciverAmountBefore: 2000.00,
reciverAmountAfter: 2500.00
}
,
{
transActionID: 2,
transActionTypeID: 2,
transActionTypeName: "Deposit",
userID: 1,
clientID: 103,
reciverID: null,
transActionDateTime: "2024-01-14T15:45:00",
amount: 1000.00,
clientAmountBefore: 500.00,
clientAmountAfter: 1500.00,
reciverAmountBefore: 0,
reciverAmountAfter: 0
},
{
transActionID: 3,
transActionTypeID: 3,
transActionTypeName: "Withdrawal",
userID: 1,
clientID: 104,
reciverID: null,
transActionDateTime: "2024-01-13T12:20:00",
amount: 200.00,
clientAmountBefore: 1500.00,
clientAmountAfter: 1300.00, 
reciverAmountBefore: 0,
reciverAmountAfter: 0
}
,
{
transActionID: 4,
transActionTypeID: 4,
transActionTypeName: "Transfer",
userID: 1,
clientID: 105,
reciverID: 106,
transActionDateTime: "2024-01-12T18:10:00",
amount: 300.00,
clientAmountBefore: 1300.00,
clientAmountAfter: 1000.00, 
reciverAmountBefore: 2000.00,
reciverAmountAfter: 2300.00
}


];




export default function TransList() {
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);
const dispatch = useAppDispatch();
const transactions = useAppSelector((state) => state.Transactions);
let transactionsList = transactions.transactions;

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
if (transactions.state === "idle") {
dispatch(fetchTransactionsSlice());
// console.log("transactions", transactions); // Commented out as per instructions
}     else if (transactions.state === "loading") {
// console.log("Loading..."); // Commented out as per instructions
} else if (transactions.state === "failed") {
console.log("Failed to fetch transactions");
}


}, []);


return (
<div style={{ maxWidth: "900px" }}>

<div
id="Head-transTable"
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
    color: "#2563EB",
    padding: 2,
    textAlign: "left",
    fontWeight: "bold",
  }}
>
  Transactions List
</Typography>
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
{transactionsList
.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
.map((transaction) => {
return (
<TableRow
hover
role="checkbox"
tabIndex={-1}
key={transaction.transActionID}
sx={{
  transition: ".3s",
}}
>
{columns.map((column) => {
  const value = transaction[column.id];
  return (
    <TableCell
      key={column.id}
      align={column.align}
      sx={{ backgroundColor: "inherit" }}
    >
      {column.format && typeof value === "number" 
        ? column.format(value)
        : column.id === "transActionDateTime" && value
        ? new Date(value).toLocaleString()
        : value}
    </TableCell>
  );
})}
</TableRow>
);
})}
</TableBody>
  </Table>
</TableContainer>
<TablePagination
  rowsPerPageOptions={[10, 25, 100]}
  component="div"
  count={transactionsSample.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  sx={{ backgroundColor: "#BFDBFE" }}
/>
</Paper>
</div>
);
}
