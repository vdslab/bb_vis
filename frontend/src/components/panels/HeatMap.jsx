import { useEffect } from "react";
import { useAnalysisData } from "@/hooks/useAnalysisData";
import HeatMapItem from "../organisms/heatmap/HeatMapItem";
import { useSelector } from "react-redux";
import "@/styles/heatmap.css";

const HeatMap = () => {
  // const [gamepkList] = useState([
  //   777486, 777504, 777509, 777537, 777600, 777630, 777640, 778163, 778379,
  //   778544,
  // ]);
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
              <HeatMapItem data={analysisData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
