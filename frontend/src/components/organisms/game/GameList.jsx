import React from "react";
import GameListCard from "./GameListCard";

const GameList = ({ games = [] }) => {
  return (
    <div
      className="game-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
      }}
    >
      {games.map((game, index) => (
        <GameListCard
          key={index}
          gamepk={game.gamepk}
          hometeam={game.hometeam}
          awayteam={game.awayteam}
          hometeamscore={game.hometeamscore}
          awayteamscore={game.awayteamscore}
          date={game.date}
        />
      ))}
    </div>
  );
};

export default GameList;
