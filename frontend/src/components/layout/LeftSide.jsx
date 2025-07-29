import ParallelCoordinates from "../panels/ParallelCoordinates";
import Game from "../panels/Game";

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <Game />
      <ParallelCoordinates />
    </div>
  );
};

export default LeftPanel;
