import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Deposite from './Deposite';
import Withdraw from './Withdraw';
import Transfer from './Transfer';
import { IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TransactionIcon from "@mui/icons-material/AccountBalance";

export default function TransactionsMenu({selectedClientID}: { selectedClientID :number}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      {isMobile || isTablet ? (
        <IconButton
          sx={{ color: "#FBBF24", "&:hover": { backgroundColor: "#FFFBEB" } }}
          onClick={handleClick}
        >
          <TransactionIcon />
        </IconButton>
      ) : (
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Transactions
        </Button>
      )}

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ marginLeft: "10px" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>
          <Deposite selectedClientID={selectedClientID} />
        </MenuItem>

        <MenuItem>
          {" "}
          <Withdraw selectedClientID={selectedClientID} />{" "}
        </MenuItem>
        <MenuItem>
          <Transfer selectedClientID={selectedClientID} />
        </MenuItem>
      </Menu>
    </div>
  );
}
