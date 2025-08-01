import React from "react";
import GameList from "../organisms/game/GameList";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Game = () => {
  const selectedTeam = useSelector((state) => state.game.selectedTeam);
  const selectedDate = useSelector((state) => state.game.selectedDate);
  const [data, setData] = useState([]);

  // TODO:フィルターされたデータが送られてくるようにorフィルターされたgamepkから取得するように
  // TODO:ソートおよびフィルター処理は別途フックを用意したい
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/2025-03-16-2025-07-28.json");
        const jsonData = await response.json();

        // チームフィルタリング
        let filteredData = jsonData;
        if (selectedTeam !== "All") {
          filteredData = jsonData.filter(
            (item) =>
              item.team.home === selectedTeam ||
              item.team.away === selectedTeam,
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

        // ソートとスライスを実行
        filteredData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        
        if (filteredData.length > 50) {
          filteredData = filteredData.slice(0, 50);
        }

        setData(filteredData);
      } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
      }
    };
    loadData();
  }, [selectedTeam, selectedDate]);

  return (
    <div className="panel-screen game-panel">
      <div className="panel-header">
        <h2>Scores</h2>
      </div>
      <div className="panel-content">
        <GameList games={data} />
      </div>
    </div>
  );
};

export default Game;
