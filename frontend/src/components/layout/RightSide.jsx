import Movie from "../panels/Movie";
import Simulation from "../panels/Simulation";

const RightPanel = () => {
  return (
    <div className="right-panel">
      <Movie />
      <Simulation />
    </div>
  );
};

export default RightPanel;
