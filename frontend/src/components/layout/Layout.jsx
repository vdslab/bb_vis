import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeftPanel from "./LeftSide";
import RightPanel from "./RightSide";
import GameDetailDialog from "../organisms/dialog/GameDetailDialog";

const Layout = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const gamepk = useSelector((state) => state.game.gamepk);
  const selectedGameDate = useSelector((state) => state.game.selectedGameDate);
  const selectedGameAwayTeam = useSelector((state) => state.game.selectedGameAwayTeam);
  const selectedGameHomeTeam = useSelector((state) => state.game.selectedGameHomeTeam);

  const selectedGameInfo = {
    date: selectedGameDate,
    awayTeam: selectedGameAwayTeam,
    homeTeam: selectedGameHomeTeam,
  };

  // ゲームが選択されたときにダイアログを自動で開く
  useEffect(() => {
    if (gamepk) {
      setIsDialogOpen(true);
    }
  }, [gamepk]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="layout-container">
        <LeftPanel />
        <RightPanel />
      </div>
      <GameDetailDialog
        isOpen={isDialogOpen}
        handleClose={handleCloseDialog}
        selectedGameInfo={selectedGameInfo}
      />
    </>
  );
};

export default Layout;
