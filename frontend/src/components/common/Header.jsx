import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import rogoImg from "../../asset/rogo.png";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpDialog from "../organisms/dialog/HelpDialog";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  /* devonly:start */
  const toDebugMode = (e) => {
    e.preventDefault();
    if(e.ctrlKey || e.metaKey){
      console.log("debug mode");
    }
  };
  /* devonly:end */

  return (
    <header className="header">
      <h1>
        {/* devonly:start */}
        <span onClick={toDebugMode}>
          {/* devonly:end */}
          <img src={rogoImg} alt="ロゴ" className="logo-img" />
          {/* devonly:start */}
        </span>
        {/* devonly:end */}
      </h1>
      <div>
        <Button onClick={handleOpen}>
          <HelpOutlineIcon />
        </Button>
      </div>
      <HelpDialog isOpen={isOpen} handleClose={handleClose} />
    </header>
  );
};

export default Header;
