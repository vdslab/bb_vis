import React from "react";
import GameList from "../organisms/game/GameList";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Game = () => {
  const selectedTeam = useSelector((state) => state.game.selectedTeam);
  const selectedDate = useSelector((state) => state.game.selectedDate);
  const filteredGamePks = useSelector((state) => state.game.filteredGamePks);
  const highlightData = useSelector((state) => state.game.highlightData);
  const highlightFromParallelCoordinates = useSelector(
    (state) => state.game.highlightFromParallelCoordinates,
  );
  const gameData = useSelector((state) => state.game.gameData);
  const isDataLoaded = useSelector((state) => state.game.isDataLoaded);
  const sortType = useSelector((state) => state.game.sortType);
  const [data, setData] = useState([]);

  // TODO:フィルターされたデータが送られてくるようにorフィルターされたgamepkから取得するように
  // TODO:ソートおよびフィルター処理は別途フックを用意したい
  useEffect(() => {
    if (!isDataLoaded || gameData.length === 0) {
      return;
    }

    // チームフィルタリング
    let filteredData = gameData;
    if (selectedTeam !== "All") {
      filteredData = gameData.filter(
        (item) => item.team.home === selectedTeam || item.team.away === selectedTeam,
      );
    }

    // 日付フィルタリング
    if (selectedDate.startDate || selectedDate.endDate) {
      filteredData = filteredData.filter((item) => {
        const itemDate = item.date;
        const startDate = selectedDate.startDate;
        const endDate = selectedDate.endDate;

        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        } else if (startDate) {
          return itemDate >= startDate;
        } else if (endDate) {
          return itemDate <= endDate;
        }
        return true;
      });
    }

    filteredData = filteredData.filter((item) => filteredGamePks.includes(item.gamepk));

    // ソート処理
    if (sortType === "日付（新しい順）") {
      filteredData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    } else if (sortType === "評価（高い順）") {
      filteredData.sort((a, b) => {
        const evalA = a.evaluation_score || 0;
        const evalB = b.evaluation_score || 0;
        return evalB - evalA;
      });
    }

    setData(filteredData);
  }, [
    gameData,
    isDataLoaded,
    selectedTeam,
    selectedDate,
    filteredGamePks,
    highlightData,
    highlightFromParallelCoordinates,
    sortType,
  ]);

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
