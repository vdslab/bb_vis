import React from "react";
import GameListCard from "./GameListCard";

const GameList = ({ games = [], highlightData }) => {
  return (
    <div
      className="game-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {games.map((game, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <GameListCard
            gamepk={game.gamepk}
            date={game.date}
            hometeam={game.team.home_short}
            awayteam={game.team.away_short}
            hometeamscore={game.score.home}
            awayteamscore={game.score.away}
            status={game.status}
            isHighlighted={highlightData === game.gamepk}
          />
        </div>
      ))}
    </div>
  );
};

export default GameList;
