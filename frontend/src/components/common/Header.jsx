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

  return (
    <header className="header">
      <h1>
        <img src={rogoImg} alt="ロゴ" className="logo-img" />
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
