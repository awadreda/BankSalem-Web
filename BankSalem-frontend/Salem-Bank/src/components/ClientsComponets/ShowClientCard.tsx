import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useAppSelector } from "../../hooks";
import TransactionsMenu from "../TransactionComponets/TransactionsMenu";
import DeleteClinTableMenue from "./DeleteClinTableMenue";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function ShowClientCard({ selectedClientID }: { selectedClientID: number }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Added isMobile variable
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // Added isTablet variable
  
  const Client = useAppSelector((state) =>
    state.clients.clients.find((client) => client.id === selectedClientID)
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {isMobile || isTablet ? (
        <IconButton onClick={handleClickOpen}>
            <InfoIcon />
          </IconButton>
      ) : (
        <Button variant="outlined" onClick={handleClickOpen}>
          View Details
        </Button>
      )}
    
    
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            minWidth: "400px",
          },
        }}
      >
        <DialogTitle>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
              <PersonIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <div>
              <div
                style={{ fontSize: "24px", fontWeight: 600, color: "#1976d2" }}
              >
                {Client?.firstName} {Client?.lastName}
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                Client ID: {selectedClientID}
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "24px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <EmailIcon sx={{ color: "#1976d2", marginRight: "12px" }} />
                  <span style={{ color: "#333" }}>{Client?.email}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <PhoneIcon sx={{ color: "#1976d2", marginRight: "12px" }} />
                  <span style={{ color: "#333" }}>{Client?.phone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AccountBalanceIcon
                    sx={{ color: "#1976d2", marginRight: "12px" }}
                  />
                  <span style={{ color: "#333" }}>
                    Account: {Client?.accountNumber}
                  </span>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "24px",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    marginBottom: "8px",
                  }}
                >
                  Current Balance
                </div>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#2e7d32",
                  }}
                >
                  ${Client?.accountBalance.toFixed(2)}
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <TransactionsMenu selectedClientID={selectedClientID} />
          <DeleteClinTableMenue
            onClose={handleClose}
            ClientID={selectedClientID}
          />

          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
