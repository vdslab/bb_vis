import HeatMapItem from "../heatmap/HeatMapItem";
import { useSelector } from "react-redux";
import { useAnalysisData } from "@/hooks/useAnalysisData";
import { useEffect } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const GameController = () => {
  const gamepk = useSelector((state) => state.game.gamepk);

  const { analysisData, loading } = useAnalysisData(gamepk);
  console.log(analysisData);

  useEffect(() => {
    console.log(analysisData);
  }, [analysisData]);

  return (
    <div className="game-controller">
      <div className="game-controller-left-arrow">
        <ArrowLeftIcon
          sx={{
            fontSize: 50,
            alignItems: "center",
            cursor: "pointer",
            color: "black",
          }}
          onClick={() => {
            console.log("left arrow clicked");
          }}
        />
      </div>

      <div className="game-controller-item">
        {loading && <div className="loading">Loading...</div>}
        {!loading && !analysisData && (
          <div className="error-message">
            <p>データが取得できませんでした。</p>
            {gamepk && <p>Game PK: {gamepk}</p>}
          </div>
        )}
        {!loading && analysisData && <HeatMapItem data={analysisData} />}
      </div>
      <div className="game-controller-right-arrow">
        <ArrowRightIcon
          sx={{
            fontSize: 50,
            alignItems: "center",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => {
            console.log("right arrow clicked");
          }}
        />
      </div>
    </div>
  );
};

export default GameController;
