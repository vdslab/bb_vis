import HeatMapItem from "../organisms/heatmap/HeatMapItem";
import { useSelector } from "react-redux";
import "@/styles/heatmap.css";

const HeatMap = () => {
  const gamepk = useSelector((state) => state.game.gamepk);
  const analysisData = useSelector((state) => state.game.analysisData);

  // データの存在チェック
  const hasValidData = analysisData;

  return (
    <div className="panel-screen heatmap-panel">
      <div className="panel-content">
        <div className="heatmap-container">
          {!analysisData && <div className="loading">Loading...</div>}
          {!analysisData && !hasValidData && (
            <div className="error-message">
              <p>No Data</p>
              {gamepk && <p>Game PK: {gamepk}</p>}
            </div>
          )}
          {analysisData && hasValidData && (
            <div className="heatmap-item">
              {/* ライブラリ描画 */}
              <HeatMapItem analysisData={analysisData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
