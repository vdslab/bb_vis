import React, { useState, useEffect } from "react";
import "@/styles/simulation.css";
import playData from "@/testdata/play_data.json";
import GameField from "../organisms/simulation/GameField";
import GameScoreBoard from "../organisms/simulation/GameScoreBoard";
import { useSelector } from "react-redux";
import { usePlayData } from "@/hooks/usePlayData";

const Simulation = () => {
  // playDataを受け取る
  const gamepk = useSelector((state) => state.game.gamepk);
  const { playData, loading } = usePlayData(gamepk);

  // p_id,e_idを受け取る
  const { p_id, e_id } = useSelector((state) => ({
    p_id: state.game.p_id,
    e_id: state.game.e_id,
  }));

  // playDataからp_id,e_idのデータを取得
  const [eventData, setEventData] = useState(playData[p_id][e_id]);

  useEffect(() => {
    setEventData(playData[p_id][e_id]);
  }, [p_id, e_id]);

  return (
    <div className="panel-screen simulation-panel">
      <div className="panel-header">
        <h2>Simulation</h2>
      </div>
      <div className="panel-content">
        {loading && <div className="loading">Loading...</div>}
        <div className="simulation-container">
          <GameScoreBoard />
          <GameField eventData={eventData} />
        </div>
      </div>
    </div>
  );
};

export default Simulation;
