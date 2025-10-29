import { useSelector, useDispatch } from "react-redux";
import { setIsDialogOpen } from "@/store/GameStore";
import LeftPanel from "./LeftSide";
import RightPanel from "./RightSide";
import GameDetailDialog from "../organisms/dialog/GameDetailDialog";

const Layout = () => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector((state) => state.game.isDialogOpen);
  const selectedGameDate = useSelector((state) => state.game.selectedGameDate);
  const selectedGameAwayTeam = useSelector((state) => state.game.selectedGameAwayTeam);
  const selectedGameHomeTeam = useSelector((state) => state.game.selectedGameHomeTeam);

  const selectedGameInfo = {
    date: selectedGameDate,
    awayTeam: selectedGameAwayTeam,
    homeTeam: selectedGameHomeTeam,
  };

  const handleCloseDialog = () => {
    dispatch(setIsDialogOpen(false));
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
