import * as React from "react";
import { Menu, MenuItem } from "@mui/material";
import DeleteClinTableMenue from "./DeleteClinTableMenue";
import EditFromCLientTable from "./EditFromCLientTable";

export interface RowMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedClientID: number | -1;
  onEdit: (selectedClientID: number) => void;
  onDelete: (selectedClientID: number) => void;
}

const RowClineMenue: React.FC<RowMenuProps> = ({
  anchorEl,
  onClose,
  selectedClientID,
  onEdit,
  // onDelete,
}) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      id="row-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 20,
        horizontal: 80,
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <MenuItem
        onClick={() => {
          if (selectedClientID) {
            onEdit(selectedClientID);
            // onClose();
          }
        }}
      >
      <EditFromCLientTable ClientId={selectedClientID} onClose={onClose} />
        {/* Edit */}
      </MenuItem>

      <MenuItem
        onClick={() => {
          if (selectedClientID) {
            // onDelete(selectedClientID);
            // onClose();
          }
        }}
      >
      <DeleteClinTableMenue 
     onClose={onClose} ClientID={selectedClientID} />
        
      </MenuItem>
    </Menu>
  );
};

export default RowClineMenue;
