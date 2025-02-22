// import SideBar from "./SideBar";
import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        textAlign: { xs: "center", sm: "left" },
        backgroundColor: "white",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 4000,

        padding: { xs: "10px", sm: "8px" },
      }}
    >
      <Typography
        variant="h3" // Increased font size
        sx={{
          color: "#1E3A8A",
          fontSize: { xs: "28px", sm: "48px" }, // Adjusted for larger sizes
          margin: 0,
          fontWeight: "bold",
          fontFamily: "'Roboto', sans-serif", // You can change this to any font you prefer
        }}
      >
        Salem Bank
      </Typography>
    </Box>
  );
}
