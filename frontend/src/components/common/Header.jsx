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
// devonly:start
import { useDispatch, useSelector } from "react-redux";
import { setIsDialogOpen } from "@/store/DebugStore";
// devonly:end

const Header = () => {
  // devonly:start
  const dispatch = useDispatch();
  const handleOpenDebugDialog = () => {
    dispatch(setIsDialogOpen(true));
  };
  const isDebugMode = useSelector((state) => state.debug.debugMode);
  // devonly:end
  
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
      handleOpenDebugDialog();
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
      {/* devonly:start */}
      <style>
        {`
          @keyframes debugFade {
            0% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
              0 0 30px rgba(255, 255, 0, 0.6),
              0 0 40px rgba(255, 255, 0, 0.3);
            }
          }
        `}
      </style>
      { isDebugMode && (
      <span
        className="debug-mode-label" 
        style={{  
          position: "absolute",
          left: "260px",
          top: "13px",
          color: "yellow",
          fontWeight: "bold",
          fontSize: "2.4rem",
          letterSpacing: "2px",
          zIndex: 9999,
          fontStyle: "italic",
          animation: "debugFade 1.5s ease-in-out infinite alternate"
        }}
      >
        - DEBUG MODE -
      </span>
      )}
      {/* devonly:end */}
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
