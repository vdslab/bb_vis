import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Simulation from "../../panels/Simulation";
import Movie from "../../panels/Movie";

const GameDetailDialog = ({ isOpen, handleClose, selectedGameInfo }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xl" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}
      >
        {selectedGameInfo
          ? `${selectedGameInfo.date} ${selectedGameInfo.awayTeam} vs ${selectedGameInfo.homeTeam}`
          : "Game Details"}
        <DialogActions>
          <IconButton onClick={handleClose} size="large">
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          padding: 0,
          height: "85vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          {/* 左側: Simulation */}
          <Box
            sx={{
              flex: "1",
              height: "100%",
              overflow: "hidden",
              borderRight: "1px solid #ccc",
            }}
          >
            <Simulation />
          </Box>

          {/* 右側: Movie (縦スクロール) */}
          <Box
            sx={{
              width: "300px",
              height: "100%",
              overflow: "auto",
              flexShrink: 0,
            }}
          >
            <Movie />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GameDetailDialog;

