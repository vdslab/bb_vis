import React from "react";
import GameListCard from "./GameListCard";

const GameList = ({ games = [] }) => {
  return (
    <div
      className="game-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "12px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {games.map((game, index) => (
        <div
          key={index}
          style={{
            flex: "0 0 auto",
            width: "32%",
            height: "120px",
          }}
        >
          <GameListCard
            gamepk={game.gamepk}
            hometeam={game.hometeam}
            awayteam={game.awayteam}
            hometeamscore={game.hometeamscore}
            awayteamscore={game.awayteamscore}
            status={game.status}
          />
        </div>
      ))}
    </div>
  );
};

export default GameList;
