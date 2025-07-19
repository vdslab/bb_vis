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
  status,
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
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        borderRadius: "8px",
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "5fr 2fr 5fr",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {hometeam}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ textAlign: "center" }}
            >
              vs
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {awayteam}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "5fr 2fr 5fr",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              component="span"
              sx={{ fontWeight: "bold", textAlign: "end" }}
            >
              {hometeamscore}
            </Typography>
            <Typography
              variant="h5"
              component="span"
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            <Typography
              variant="h4"
              component="span"
              sx={{ fontWeight: "bold", textAlign: "start" }}
            >
              {awayteamscore}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h7"
              component="span"
              sx={{ fontWeight: "bold", textAlign: "start" }}
            >
              {status}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameListCard;
