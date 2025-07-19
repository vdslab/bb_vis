import Movie from "../panels/Movie";
import Simulation from "../panels/Simulation";
import Game from "../panels/Game";

const RightPanel = () => {
  return (
    <div className="right-panel">
      <Movie />
      <Game />
    </div>
  );
};

export default RightPanel;
