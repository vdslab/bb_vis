import React from "react";
import { Box, Typography } from "@mui/material";
import GameList from "../organisms/game/GameList";

const Game = () => {
  // サンプルゲームデータ
  const games = [
    {
      gamepk: "1",
      hometeam: "東京チーム",
      awayteam: "大阪チーム",
      hometeamscore: 3,
      awayteamscore: 1,
      date: "2024-01-15",
    },
    {
      gamepk: "2",
      hometeam: "名古屋チーム",
      awayteam: "福岡チーム",
      hometeamscore: 2,
      awayteamscore: 2,
      date: "2024-01-20",
    },
    {
      gamepk: "3",
      hometeam: "横浜チーム",
      awayteam: "神戸チーム",
      hometeamscore: 4,
      awayteamscore: 0,
      date: "2024-01-25",
    },
    {
      gamepk: "4",
      hometeam: "札幌チーム",
      awayteam: "仙台チーム",
      hometeamscore: 1,
      awayteamscore: 3,
      date: "2024-01-30",
    },
    {
      gamepk: "5",
      hometeam: "広島チーム",
      awayteam: "鹿島チーム",
      hometeamscore: 2,
      awayteamscore: 1,
      date: "2024-02-05",
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
