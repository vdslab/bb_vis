import "@/styles/parallelcoordinates.css";
import ParallelCoordinatesItem from "../organisms/parallelcoordinates/ParallelCoordinatesItem";
import { useState } from "react";
import Button from "../atoms/Button";

const ParallelCoordinates = () => {
  // データを取得
  // 強調表示をするgamepkのリストを取得
  const [brushDeleteFlag, setBrushDeleteFlag] = useState(false);
  const handleClearBrush = () => {
    setBrushDeleteFlag(!brushDeleteFlag);
  };

  return (
    <div className="panel-screen parallel-panel">
      <div className="panel-header">
        <h2>試合特徴比較チャート</h2>
        <Button onClick={handleClearBrush} style={{ margin: "10px" }}>
          ブラッシング解除
        </Button>
      </div>
      <div className="panel-content parallelcoordinates-content">
        <div className="parallel-coordinates-container">
          <ParallelCoordinatesItem brushDeleteFlag={brushDeleteFlag} />
        </div>
      </div>
    </div>
  );
};

export default ParallelCoordinates;
