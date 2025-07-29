import React, { useState, useEffect } from "react";
import "@/styles/simulation.css";
import GameField from "../organisms/simulation/GameField";
import GameScoreBoard from "../organisms/simulation/GameScoreBoard";
import GameController from "../organisms/simulation/GameController";
import { useSelector } from "react-redux";
import { usePlayData } from "@/hooks/usePlayData";

const Simulation = () => {
  // playDataを受け取る
  const gamepk = useSelector((state) => state.game.gamepk);
  const { playData } = usePlayData(gamepk);

  // p_id,e_idを受け取る
  const p_id = useSelector((state) => state.game.id.p_id);
  const e_id = useSelector((state) => state.game.id.e_id);

  // playDataからp_id,e_idのデータを取得
  const [eventData, setEventData] = useState("");
  const [metaData, setMetaData] = useState("");

  useEffect(() => {
    if (
      playData &&
      p_id !== null &&
      e_id !== null &&
      playData.data &&
      playData.data[p_id] &&
      playData.data[p_id][e_id] !== undefined
    ) {
      setEventData(playData.data[p_id][e_id]);
      setMetaData(playData.meta);
    } else {
      setEventData("");
      setMetaData("");
    }
  }, [p_id, e_id, playData]);

  return (
    <div className="panel-screen simulation-panel">
      <div className="panel-header">
        <h2>Simulation</h2>
      </div>
      <div className="panel-content">
        <div className="simulation-container">
          <GameController
            eventData={eventData}
            playData={playData}
            p_id={p_id}
            e_id={e_id}
          />
          <GameScoreBoard metaData={metaData} eventData={eventData} />
          <GameField eventData={eventData} />
        </div>
      </div>
    </div>
  );
};

export default Simulation;
