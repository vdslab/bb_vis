import React from "react";
import { useDispatch } from "react-redux";
import { setGamePk, setHighlightData, setSelectedGameAwayTeam, setSelectedGameHomeTeam, setSelectedGameDate, setHighlightFromParallelCoordinates } from "@/store/GameStore";
import "@/styles/gamelistcard.css";

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
    <div 
      className={`game-list-card ${isHighlighted ? "highlighted" : ""}`}
      onClick={handleClick}
    >
      {isHighlighted && (
        <div className="game-list-card-pulse-indicator" />
      )}
      <div className="game-list-card-date">
        {date.replace(/-/g, "/")}
      </div>
      <div className="game-list-card-teams">
        {/* ホームチーム名 */}
        <div className="game-list-card-team-name">
          {hometeam}
        </div>
        {/* ホームチームスコア */}
        <span className="game-list-card-score score-end">
          {hometeamscore}
        </span>
        <span className="game-list-card-score score-center">
          -
        </span>
        {/* アウェーチームスコア */}
        <span className="game-list-card-score score-start">
          {awayteamscore}
        </span>
        {/* アウェーチーム名 */}
        <div className="game-list-card-team-name">
          {awayteam}
        </div>
      </div>
    </div>
  );
};

export default GameListCard;
