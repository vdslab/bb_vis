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
  date,
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
        boxShadow: "none",
        borderRadius: "0px",
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardContent sx={{ padding: "8px" }}>
          <Box>
            <Typography
              variant="body1"
              component="div"
              sx={{ textAlign: "left", fontSize: "0.7rem" }}
            >
              {date.replace(/-/g, "/")}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr 2fr 1fr 3fr",
            }}
          >
            {/* ホームチーム名 */}
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Soei Kaku Pop",
                fontStyle: "italic",
                fontSize: "1.4rem",
              }}
            >
              {hometeam}
            </Typography>
            {/* ホームチームスコア */}
            <Typography
              variant="body1"
              component="span"
              sx={{ fontWeight: "bold", fontSize: "1.2rem", justifyContent: "flex-end", display: "flex", alignItems: "center", height: "100%" }}
            >
              {hometeamscore}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" ,justifyContent: "center", display: "flex", alignItems: "center", height: "100%"}}
            >
              -
            </Typography>
            {/* アウェーチームスコア */}
            <Typography
              variant="body1"
              component="span"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" ,justifyContent: "flex-start", display: "flex", alignItems: "center", height: "100%" }}
            >
              {awayteamscore}
            </Typography>
            {/* アウェーチーム名 */}
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Soei Kaku Pop",
                fontStyle: "italic",
                fontSize: "1.4rem",
              }}
            >
              {awayteam}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameListCard;
