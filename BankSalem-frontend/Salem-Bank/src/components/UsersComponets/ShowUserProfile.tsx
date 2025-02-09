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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAppSelector } from "../../hooks";
import DeleteUser from "./DeleteUser";
import IconButton from "@mui/material/IconButton";
import EditUser from "./EditUser";

export default function ShowUserProfile({
  selectedUserId,
}: {
  selectedUserId: number;
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const user = useAppSelector((state) =>
    state.users.users.find((user) => user.user_ID === selectedUserId)
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} color="primary">
        <PersonIcon />
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
            <Avatar sx={{ bgcolor: "#1E40AF", width: 56, height: 56 }}>
              <PersonIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <div>
              <div
                style={{ fontSize: "24px", fontWeight: 600, color: "#1E40AF" }}
              >
                {user?.firstName} {user?.lastName}
              </div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                User ID: {selectedUserId}
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
                  <EmailIcon sx={{ color: "#1E40AF", marginRight: "12px" }} />
                  <span style={{ color: "#333" }}>{user?.email}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <PhoneIcon sx={{ color: "#1E40AF", marginRight: "12px" }} />
                  <span style={{ color: "#333" }}>{user?.phone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AdminPanelSettingsIcon
                    sx={{ color: "#1E40AF", marginRight: "12px" }}
                  />
                  <span style={{ color: "#333" }}>
                    Permission Level: {user?.permission}
                  </span>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#EFF6FF",
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
                  Username
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#1E40AF",
                  }}
                >
                  {user?.userName}
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
                  <EditUser userId={selectedUserId} onClose={handleClose} />
          <DeleteUser userId={selectedUserId} onClose={handleClose} />
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#1E40AF",
              color: "white",
              "&:hover": { backgroundColor: "#1E3A8A" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
