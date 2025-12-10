import React, { useState, useEffect } from "react";
import "@/styles/simulation.css";
import GameField from "../organisms/simulation/GameField";
import GameScoreBoard from "../organisms/simulation/GameScoreBoard";
import GameController from "../organisms/simulation/GameController";
import PlayEventOverlay from "../organisms/simulation/PlayEventOverlay";
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

  // ヒートマップのホバー情報
  const [contextEvents, setContextEvents] = useState([]);
  const [hoveredPId, setHoveredPId] = useState(null);
  const [hoveredEId, setHoveredEId] = useState(null);
  const [hoveredEventData, setHoveredEventData] = useState(null);

  // playDataが読み込まれたら、全イベントを一度だけ作成
  useEffect(() => {
    if (playData && playData.data) {
      // すべてのp_idのイベントをフラットな配列にする
      const events = [];
      const playIds = Object.keys(playData.data)
        .map(Number)
        .sort((a, b) => a - b);

      playIds.forEach((pid) => {
        const playEvents = playData.data[pid];
        if (playEvents) {
          const eventKeys = Object.keys(playEvents)
            .map(Number)
            .filter((key) => playEvents[key] !== null && playEvents[key] !== undefined)
            .sort((a, b) => a - b);

          eventKeys.forEach((eid) => {
            events.push({
              ...playEvents[eid],
              p_id: pid,
              e_id: eid,
              index: eid,
            });
          });
        }
      });

      setContextEvents(events); // 全イベントをcontextEventsにセット
    }
  }, [playData]);

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

  // ヒートマップのホバーイベントハンドラー
  const handleHeatmapHover = (data) => {
    if (data && playData && playData.data) {
      setHoveredPId(data.p_id);
      setHoveredEId(data.e_id);

      // ホバーしたイベントのデータを取得
      if (playData.data[data.p_id] && playData.data[data.p_id][data.e_id]) {
        setHoveredEventData(playData.data[data.p_id][data.e_id]);
      }
    }
  };

  const handleHeatmapLeave = () => {
    // ホバー解除したら、現在のp_id/e_idに戻す
    setHoveredPId(null);
    setHoveredEId(null);
    setHoveredEventData(null);
  };

  return (
    <div className="panel-screen simulation-panel">
      <div className="panel-content">
        <div className="simulation-container">
          <GameController
            eventData={hoveredEventData || eventData}
            playData={playData}
            p_id={p_id}
            e_id={e_id}
            onHeatmapHover={handleHeatmapHover}
            onHeatmapLeave={handleHeatmapLeave}
          />
          <GameScoreBoard metaData={metaData} eventData={hoveredEventData || eventData} />
          <GameField eventData={hoveredEventData || eventData} />

          {/* イベント詳細オーバーレイ */}
          <PlayEventOverlay
            contextEvents={contextEvents}
            currentPId={p_id}
            currentEId={e_id}
            hoveredPId={hoveredPId}
            hoveredEId={hoveredEId}
          />
        </div>
      </div>
    </div>
  );
};

export default Simulation;
