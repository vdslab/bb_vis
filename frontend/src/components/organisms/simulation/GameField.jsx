import React, { useState, useEffect } from "react";
import yakyujouImage from "@/asset/yakyujou_touka1.png";
import "@/styles/simulation.css";
import runnerImg1 from "../../../asset/runner1.png";

const GameField = ({ eventData }) => {
  const [runners, setRunners] = useState({
    first: { name: null },
    second: { name: null },
    third: { name: null },
  });

  useEffect(() => {
    if (eventData) {
      const runnerState = eventData.runner_state.pos_runner_state;
      setRunners({
        first: { name: runnerState["1B"].full_name },
        second: { name: runnerState["2B"].full_name },
        third: { name: runnerState["3B"].full_name },
      });
    }
  }, [eventData]);

  return (
    <div className="game-field">
      <img src={yakyujouImage} alt="野球場" className="field-background" />

      <div className="runners-overlay">
        {/* 一塁ランナー */}
        {runners.first.name && (
          <div className="runner first-base">
            <span className="runner-name">{runners.first.name}</span>
            <div className="runner-img-wrapper">
              <img src={runnerImg1} alt="ランナー" className="runner-img" />
            </div>
          </div>
        )}

        {/* 二塁ランナー */}
        {runners.second.name && (
          <div className="runner second-base">
            <span className="runner-name">{runners.second.name}</span>
            <div className="runner-img-wrapper">
              <img src={runnerImg1} alt="ランナー" className="runner-img" />
            </div>
          </div>
        )}

        {/* 三塁ランナー */}
        {runners.third.name && (
          <div className="runner third-base">
            <span className="runner-name">{runners.third.name}</span>
            <div className="runner-img-wrapper">
              <img src={runnerImg1} alt="ランナー" className="runner-img" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GameField;
