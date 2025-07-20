import "@/styles/parallelcoordinates.css";
import ParallelCoordinatesItem from "../organisms/parallelcoordinates/ParallelCoordinatesItem";

const ParallelCoordinates = () => {
  // データを取得
  // 強調表示をするgamepkのリストを取得

  return (
    <div className="panel-screen parallel-panel">
      <div className="panel-header">
        <h2>Parallel Coordinates</h2>
      </div>
      <div className="panel-content parallelcoordinates-content">
        <div className="parallel-coordinates-container">
          <ParallelCoordinatesItem />
        </div>
      </div>
    </div>
  );
};

export default ParallelCoordinates;
