import React from "react";
import { useDispatch } from "react-redux";
import { setGamePk, setHighlightData, setSelectedGameAwayTeam, setSelectedGameHomeTeam, setSelectedGameDate, setHighlightFromParallelCoordinates } from "@/store/GameStore";

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
  isHighlighted = false,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setGamePk(gamepk));
    dispatch(setHighlightData(gamepk));
    dispatch(setHighlightFromParallelCoordinates(false));
    dispatch(setSelectedGameDate(date));
    dispatch(setSelectedGameAwayTeam(awayteam));
    dispatch(setSelectedGameHomeTeam(hometeam));
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        boxShadow: isHighlighted ? "0px 4px 20px rgba(255, 193, 7, 0.5)" : "none",
        borderRadius: "0px",
        background: isHighlighted 
          ? "linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 235, 59, 0.05) 100%)"
          : "transparent",
        border: isHighlighted ? "2px solidrgb(7, 255, 247)" : "none",
        "&:hover": {
          transform: isHighlighted ? "scale(1.02)" : "scale(1)",
          boxShadow: isHighlighted 
            ? "0px 6px 25px rgba(255, 193, 7, 0.7)"
            : "0px 2px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardContent sx={{ padding: "8px", position: "relative" }}>
          {isHighlighted && (
            <Box
              sx={{
                position: "absolute",
                top: "4px",
                right: "4px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#ffc107",
                boxShadow: "0px 0px 8px rgba(255, 193, 7, 0.8)",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": {
                    boxShadow: "0 0 0 0 rgba(255, 193, 7, 0.7)",
                  },
                  "70%": {
                    boxShadow: "0 0 0 8px rgba(255, 193, 7, 0)",
                  },
                  "100%": {
                    boxShadow: "0 0 0 0 rgba(255, 193, 7, 0)",
                  },
                },
              }}
            />
          )}
          <Box>
            <Typography
              variant="body1"
              component="div"
              sx={{ 
                textAlign: "left", 
                fontSize: "0.7rem",
                color: isHighlighted ? "#ff6f00" : "inherit",
                fontWeight: isHighlighted ? "bold" : "normal",
              }}
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
                color: isHighlighted ? "#ff6f00" : "inherit",
                textShadow: isHighlighted ? "0px 0px 4px rgba(255, 111, 0, 0.3)" : "none",
              }}
            >
              {hometeam}
            </Typography>
            {/* ホームチームスコア */}
            <Typography
              variant="body1"
              component="span"
              sx={{ 
                fontWeight: "bold", 
                fontSize: "1.2rem", 
                justifyContent: "flex-end", 
                display: "flex", 
                alignItems: "center", 
                height: "100%",
                color: isHighlighted ? "#ff6f00" : "inherit",
              }}
            >
              {hometeamscore}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ 
                fontWeight: "bold", 
                fontSize: "1.2rem",
                justifyContent: "center", 
                display: "flex", 
                alignItems: "center", 
                height: "100%",
                color: isHighlighted ? "#ff6f00" : "inherit",
              }}
            >
              -
            </Typography>
            {/* アウェーチームスコア */}
            <Typography
              variant="body1"
              component="span"
              sx={{ 
                fontWeight: "bold", 
                fontSize: "1.2rem",
                justifyContent: "flex-start", 
                display: "flex", 
                alignItems: "center", 
                height: "100%",
                color: isHighlighted ? "#ff6f00" : "inherit",
              }}
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
                color: isHighlighted ? "#ff6f00" : "inherit",
                textShadow: isHighlighted ? "0px 0px 4px rgba(255, 111, 0, 0.3)" : "none",
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
