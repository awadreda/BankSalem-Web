import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useAppSelector } from "../../hooks";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Transaction } from "../../Types/types";

export default function ShowTransactionCard({
  selectedTransactionID,
}: {
  selectedTransactionID: number;
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
 

  const transaction = useAppSelector((state) =>
    state.Transactions.transactions.find((trans) => trans.transActionID === selectedTransactionID)
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
    
        <IconButton onClick={handleClickOpen}>
          <InfoIcon />
        </IconButton>
    

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
              <CompareArrowsIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <div>
              <div
                style={{ fontSize: "24px", fontWeight: 600, color: "#1976d2" }}
              >
                Transaction ID: {transaction?.transActionID}
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                Type: {transaction?.transActionTypeName}
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
                <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ color: "#333" }}>
                    Amount: ${transaction?.amount.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ color: "#333" }}>
                    From Account: {transaction?.clientID || '-'}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#333" }}>
                    To Account: {transaction?.reciverID || '-'}
                  </span>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
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
