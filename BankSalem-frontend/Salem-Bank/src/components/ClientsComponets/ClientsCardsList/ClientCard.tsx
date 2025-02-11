import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Client } from "../ClientsTable";
import ShowClientCard from "../ShowClientCard";
import EditFromCLientTableIConForMobile from "./iconEditClient";
import TransactionIcon from "@mui/icons-material/AccountBalance";
import DeleteIcon from "@mui/icons-material/Delete";
import TransactionsMenu from "../../TransactionComponets/TransactionsMenu";

export default function ClientCard({ client }: { client: Client }) {
  return (
    <Card
      sx={{
        mb: 2,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.01)",
          transition: "all 0.2s ease-in-out",
        },
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                color: "#1E40AF",
                letterSpacing: "0.5px",
              }}
            >
              {`${client.firstName} ${client.lastName}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 500,
                color: "#4B5563",
                fontSize: "1rem",
                paddingTop: "4px",
              }}
            >
              Email: {client.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 500,
                color: "#4B5563",
                fontSize: "1rem",
              }}
            >
              Client ID: {client.id}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 500,
                color: "#4B5563",
                fontSize: "1rem",
              }}
            >
              Account: {client.accountNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#059669",
                letterSpacing: "0.5px",
              }}
            >
              Balance:{" "}
              {client.accountBalance.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 2,
            backgroundColor: "#F9FAFB",
            padding: 1,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <ShowClientCard selectedClientID={client.id} />

          <EditFromCLientTableIConForMobile ClientId={client.id} />

          <TransactionsMenu selectedClientID={client.id} />
         
         
{/*          
          <IconButton
            sx={{ color: "#DC2626", "&:hover": { backgroundColor: "#FEF2F2" } }}
          >
            <DeleteIcon />
          </IconButton> */}

        </Box>
      </CardContent>
    </Card>
  );
}
