import { useState, useEffect } from "react";
import yakyujouImage from "@/asset/ground.png";
import runnerImg1 from "../../../asset/runner1.png";
import runnerImg2 from "../../../asset/runner2.png";
import pitcherImg1 from "../../../asset/pitcher1.png";
import pitcherImg2 from "../../../asset/pitcher2.png";
import homerunImg from "../../../asset/homerun.png";
import autImg from "../../../asset/aut.png";
import hitImg from "../../../asset/hit.png";
import doubleImg from "../../../asset/double.png";
import tripleImg from "../../../asset/triple.png";
import RunnersDisplay from "./RunnersDisplay";
import { useRunnerAnimation } from "@/hooks/useRunnerAnimation";
import "@/styles/simulation.css";

/**
 * 野球場の表示コンポーネント
 * ランナーアニメーション機能付き
 */
const GameField = ({ eventData }) => {
  const [runnerImg, setRunnerImg] = useState(null);
  const [pitcherImg, setPitcherImg] = useState(null);

  // ランナーのアニメーション管理（元のロジックをそのまま使用）
  const { runners, animatingRunners } = useRunnerAnimation(eventData);

  // チームに応じた画像を設定
  useEffect(() => {
    if (eventData) {
      const currentRunnerImg = eventData.is_away ? runnerImg1 : runnerImg2;
      setRunnerImg(currentRunnerImg);
      setPitcherImg(currentRunnerImg === runnerImg1 ? pitcherImg1 : pitcherImg2);
    }
  }, [eventData]);

  return (
    <div className="game-field">
      {/* 背景画像 */}
      <img src={yakyujouImage} alt="野球場" className="field-background" />

      {/* ホームラン画像 */}
      {eventData?.event_type === "home_run" && (
        <img src={homerunImg} alt="Home Run" className="homerun-img" />
      )}
      {/* アウト画像 */}
      {eventData?.event_type === "field_out" && (
        <>
          <img src={autImg} alt="Out" className="out-img" />
        </>
      )}

      {/* ヒット画像 */}
      {eventData?.event_type === "single" && <img src={hitImg} alt="Hit" className="hit-img" />}
      {/* ダブル画像 */}
      {eventData?.event_type === "double" && (
        <img src={doubleImg} alt="Double" className="double-img" />
      )}
      {/* トリプル画像 */}
      {eventData?.event_type === "triple" && (
        <img src={tripleImg} alt="Triple" className="triple-img" />
      )}

      {/* 新しいレイヤー：field-overlay */}
      <div className="field-overlay">
        {/* ピッチャー */}
        {runnerImg && pitcherImg && (
          <div className="pitcher">
            <img src={pitcherImg} alt="ピッチャー" className="pitcher-img" />
          </div>
        )}

        {/* ランナー表示（元のロジックをそのまま使用） */}
        <RunnersDisplay
          runners={runners}
          animatingRunners={animatingRunners}
          runnerImg={runnerImg}
        />
      </div>
    </div>
  );
};

export default GameField;
