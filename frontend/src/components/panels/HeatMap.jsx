import { useEffect } from "react";
import { useAnalysisData } from "@/hooks/useAnalysisData";
import HeatMapItem from "../organisms/heatmap/HeatMapItem";
import HeatMapItemTest from "../organisms/heatmap/HeatMapItemTest";
import { useSelector } from "react-redux";
import "@/styles/heatmap.css";

const HeatMap = () => {
  const gamepk = useSelector((state) => state.game.gamepk);

  const { analysisData, loading } = useAnalysisData(gamepk);
  console.log(analysisData);

  useEffect(() => {
    console.log(analysisData);
  }, [analysisData]);

  // データの存在チェック
  const hasValidData = analysisData;

  return (
    <div className="panel-screen heatmap-panel">
      <div className="panel-content">
        <div className="heatmap-container">
          {loading && <div className="loading">Loading...</div>}
          {!loading && !hasValidData && (
            <div className="error-message">
              <p>データが取得できませんでした。</p>
              {gamepk && <p>Game PK: {gamepk}</p>}
            </div>
          )}
          {!loading && hasValidData && (
            <div className="heatmap-item">
              {/* ライブラリ描画 */}
              <HeatMapItem data={analysisData} />
              {/* 通常データ時 上:通常描画,下:長さスケール */}
              {/* スケールテスト用データ時 上:データスケール,下:無し */}
              {/* <HeatMapItemTest data={analysisData} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
