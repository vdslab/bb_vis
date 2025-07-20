import React, { useState } from "react";
import yakyujouImage from "@/asset/yakyujou.jpg";
import "@/styles/simulation.css";

const GameField = ({ eventData }) => {
  const runnerState = eventData.runner_state.pos_runner_state;

  const [runners] = useState({
    first: { name: runnerState["1B"].full_name },
    second: { name: runnerState["2B"].full_name },
    third: { name: runnerState["3B"].full_name },
  });

  return (
    <div className="game-field">
      <img src={yakyujouImage} alt="野球場" className="field-background" />

      <div className="runners-overlay">
        {/* 一塁ランナー */}
        {runners.first.name && (
          <div className="runner first-base">
            <div className="runner-circle">
              <span className="runner-name">{runners.first.name}</span>
            </div>
          </div>
        )}

        {/* 二塁ランナー */}
        {runners.second.name && (
          <div className="runner second-base">
            <div className="runner-circle">
              <span className="runner-name">{runners.second.name}</span>
            </div>
          </div>
        )}

        {/* 三塁ランナー */}
        {runners.third.name && (
          <div className="runner third-base">
            <div className="runner-circle">
              <span className="runner-name">{runners.third.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameField;
