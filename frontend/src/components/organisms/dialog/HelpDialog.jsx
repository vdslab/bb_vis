import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const HelpDialog = ({ isOpen, handleClose }) => {
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
          >
            Help
          </Typography>
          <DialogActions>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </DialogActions>
        </DialogTitle>
        <DialogContent>
          <DialogContent dividers>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </Typography>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HelpDialog;
