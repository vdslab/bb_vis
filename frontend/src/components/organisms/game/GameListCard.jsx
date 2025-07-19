import React from "react";
import { useDispatch } from "react-redux";
import { setGamePk } from "@/store/GameStore";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Chip,
} from "@mui/material";

const GameListCard = ({
  gamepk,
  hometeam,
  awayteam,
  hometeamscore,
  awayteamscore,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setGamePk(gamepk));
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        // boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Box>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {hometeam} vs {awayteam}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              component="span"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {hometeamscore}
            </Typography>
            <Typography
              variant="h5"
              component="span"
              sx={{ mx: 2, color: "text.secondary" }}
            >
              -
            </Typography>
            <Typography
              variant="h4"
              component="span"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {awayteamscore}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameListCard;
