// devonly:start
import { Dialog, DialogTitle } from "@mui/material";

const DebugDialog = ({ isOpen, handleClose }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>DebugTools</DialogTitle>
    </Dialog>
  );
};

export default DebugDialog;
// devonly:end