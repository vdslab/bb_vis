import Movie from "../panels/Movie";
import Simulation from "../panels/Simulation";
import Game from "../panels/Game";

const RightPanel = () => {
  return (
    <div className="right-panel">
      <Movie />
      {/* <Game /> */}
      <Simulation />
    </div>
  );
};

export default RightPanel;
