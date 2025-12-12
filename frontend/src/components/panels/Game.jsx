import React from "react";
import GameList from "../organisms/game/GameList";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Game = () => {
  const filteredGamePks = useSelector((state) => state.game.filteredGamePks);
  const highlightData = useSelector((state) => state.game.highlightData);
  const gameData = useSelector((state) => state.game.gameData);
  const isDataLoaded = useSelector((state) => state.game.isDataLoaded);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isDataLoaded || gameData.length === 0) {
      return;
    }

    // filteredGamePksに含まれるデータだけを取得し、順序を維持
    const filteredData = filteredGamePks
      .map((gamepk) => gameData.find((item) => item.gamepk === gamepk))
      .filter((item) => item !== undefined);

    setData(filteredData);
  }, [gameData, isDataLoaded, filteredGamePks]);

  return (
    <div className="panel-screen game-panel">
      <div className="panel-header">
        <h2>試合リスト</h2>
      </div>
      <div className="panel-content" style={{ textAlign: "center" }}>
        {data.length === 0 ? (
          <div className="no-data-container">
            <p className="scores-no-data-text">No Data</p>
          </div>
        ) : (
          <GameList games={data} highlightData={highlightData} />
        )}
      </div>
    </div>
  );
};

export default Game;
