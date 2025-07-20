import React from "react";
import { Box, Typography } from "@mui/material";
import GameList from "../organisms/game/GameList";

const Game = () => {
  // サンプルゲームデータ
  const games = [
    {
      gamepk: "1",
      hometeam: "dogers",
      awayteam: "rays",
      hometeamscore: 3,
      awayteamscore: 1,
      date: "2024-01-15",
      status: "final",
    },
    {
      gamepk: "2",
      hometeam: "padres",
      awayteam: "dodgers",
      hometeamscore: 2,
      awayteamscore: 2,
      date: "2024-01-20",
      status: "final",
    },
    {
      gamepk: "3",
      hometeam: "redsox",
      awayteam: "rays",
      hometeamscore: 4,
      awayteamscore: 0,
      date: "2024-01-25",
      status: "final",
    },
    {
      gamepk: "4",
      hometeam: "mariners",
      awayteam: "dodgers",
      hometeamscore: 1,
      awayteamscore: 3,
      date: "2024-01-30",
      status: "final",
    },
    {
      gamepk: "5",
      hometeam: "giants",
      awayteam: "dodgers",
      hometeamscore: 2,
      awayteamscore: 1,
      date: "2024-02-05",
      status: "final",
    },
  ];

  return (
    <div className="panel-screen game-panel">
      <div className="panel-header">
        <h2>Game</h2>
      </div>
      <div className="panel-content">
        <GameList games={games} />
      </div>
    </div>
  );
};

export default Game;
