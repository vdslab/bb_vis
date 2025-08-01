import Movie from "../panels/Movie";
import Simulation from "../panels/Simulation";
import Game from "../panels/Game";    
import { useSelector } from "react-redux";

const RightPanel = () => {
  const selectedGameDate = useSelector((state) => state.game.selectedGameDate);
  const selectedGameAwayTeam = useSelector((state) => state.game.selectedGameAwayTeam);
  const selectedGameHomeTeam = useSelector((state) => state.game.selectedGameHomeTeam);

  return (
    <div className="right-panel">
      <div className="right-panel-header">
          <h2>
            {selectedGameDate
              ? `${selectedGameDate}　${selectedGameAwayTeam} vs ${selectedGameHomeTeam}`
              : "試合日と対戦カードを選択してください"}
          </h2>
      </div>
      <Movie />
      {/* <Game /> */}
      <Simulation />
    </div>
  );
};

export default RightPanel;
