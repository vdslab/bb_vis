import Search from "../panels/Search";
import HeatMap from "../panels/HeatMap";

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <Search />
      <HeatMap />
    </div>
  );
};

export default LeftPanel;
