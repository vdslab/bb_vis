import React from "react";
import { useDispatch } from "react-redux";
import { setIsDialogOpen } from "@/store/GameStore";
import "@styles/gamelistcarddetail.css";
import Button from "@/components/atoms/button";
import { setAnalysisData } from "@/store/GameStore";
import { useAnalysisData } from "@/hooks/useAnalysisData";
import HeatMapItem from "../heatmap/HeatMapItem";
import GameEvaluation from "./GameEvaluation";

const GameListCardDetail = ({ gamepk }) => {
  // アコーディオンで試合の情報を表示する
  // cssで大きさを決める
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsDialogOpen(true));
  };

  const { analysisData, loading } = useAnalysisData(gamepk);
  if (analysisData && !loading) {
    dispatch(setAnalysisData(analysisData));
  }

  return (
    <div className="game-list-card-detail">
      <div className="game-list-card-detail-upper">
        <div className="game-list-card-detail-upper-heatmap">
          {analysisData && !loading && <HeatMapItem analysisData={analysisData} />}
        </div>
        <div className="game-list-card-detail-upper-heatmap-evaluation">
          <GameEvaluation analysisData={analysisData} />
        </div>
      </div>
      <div className="game-list-card-detail-middle"></div>
      <div className="game-list-card-detail-under">
        <Button onClick={handleClick}>View Game Details →</Button>
      </div>
    </div>
  );
};

export default GameListCardDetail;
