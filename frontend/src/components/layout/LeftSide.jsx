import Search from "../panels/Search";
import HeatMap from "../panels/HeatMap";
import ParallelCoordinates from "../panels/ParallelCoordinates";

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <Search />
      {/* <HeatMap /> */}
      <ParallelCoordinates />
    </div>
  );
};

export default LeftPanel;
