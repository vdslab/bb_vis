import "@/styles/parallelcoordinates.css";
import ParallelCoordinatesItem from "../organisms/parallelcoordinates/ParallelCoordinatesItem";
import { useState } from "react";

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
        <h2>Parallel Coordinates</h2>
        <button onClick={handleClearBrush} style={{ margin: "10px" }}>
          ブラシ選択解除
        </button>
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
