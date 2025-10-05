import React, { useState, useEffect } from "react";
import yakyujouImage from "@/asset/ground.png";
import "@/styles/simulation.css";
import runnerImg1 from "../../../asset/runner1.png";
import runnerImg2 from "../../../asset/runner2.png";
import pitcherImg1 from "../../../asset/pitcher1.png";
import pitcherImg2 from "../../../asset/pitcher2.png";

const GameField = ({ eventData }) => {
  const [runners, setRunners] = useState({
    first: { name: null },
    second: { name: null },
    third: { name: null },
  });

  const [runnerImg, setRunnerImg] = useState(null);
  const [pitcherImg, setPitcherImg] = useState(null);

  useEffect(() => {
    if (eventData) {
      // ランナー画像を決定
      const currentRunnerImg = eventData.is_away ? runnerImg1 : runnerImg2;
      setRunnerImg(currentRunnerImg);

      // ランナー画像に応じてピッチャー画像を決定
      if (currentRunnerImg === runnerImg1) {
        setPitcherImg(pitcherImg1);
      } else if (currentRunnerImg === runnerImg2) {
        setPitcherImg(pitcherImg2);
      }

      // ランナー状態の更新
      const runnerState = eventData.runner_state.pos_runner_state;
      setRunners({
        first: { name: runnerState["1B"]?.full_name || null },
        second: { name: runnerState["2B"]?.full_name || null },
        third: { name: runnerState["3B"]?.full_name || null },
      });
    }
  }, [eventData]);

  return (
    <div className="game-field">
      <img src={yakyujouImage} alt="野球場" className="field-background" />

      {/* ランナーが表示されるときだけピッチャーも表示 */}
      {runnerImg && pitcherImg && (
        <div className="pitcher">
          <img src={pitcherImg} alt="ピッチャー" className="pitcher-img" />
        </div>
      )}

      <div className="runners-overlay">
        {/* 一塁ランナー */}
        {runners.first.name && (
          <div className="runner first-base">
            <span className="runner-name">{runners.first.name}</span>
            <div className="runner-img-wrapper">
              <img src={runnerImg} alt="ランナー" className="runner-img" />
            </div>
          </div>
        )}

        {/* 二塁ランナー */}
        {runners.second.name && (
          <div className="runner second-base">
            <span className="runner-name">{runners.second.name}</span>
            <div className="runner-img-wrapper">
              <img src={runnerImg} alt="ランナー" className="runner-img" />
            </div>
          </div>
        )}

        {/* 三塁ランナー */}
        {runners.third.name && (
          <div className="runner third-base">
            <span className="runner-name">{runners.third.name}</span>
            <div className="runner-img-wrapper">
              <img src={runnerImg} alt="ランナー" className="runner-img" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GameField;
