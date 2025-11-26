// devonly:start
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogTitle, Switch, FormControl, FormControlLabel } from "@mui/material";
import { setDebugMode } from "@/store/DebugStore";

const DebugDialog = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const isDebugMode = useSelector((state) => state.debug.debugMode);

  const handleChangeDebugMode = () => {
    dispatch(setDebugMode(!isDebugMode));
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>DebugTools</DialogTitle>
      <FormControl>
        <FormControlLabel
          control={
            <Switch checked={isDebugMode} onChange={handleChangeDebugMode} name="debugMode" />
          }
          label="Debug Mode"
        />
      </FormControl>
    </Dialog>
  );
};

export default DebugDialog;
// devonly:end
