import HeatMapItem from "../heatmap/HeatMapItem";
import { useSelector } from "react-redux";
import { useAnalysisData } from "@/hooks/useAnalysisData";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { setId } from "@/store/GameStore";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";

const GameController = ({ eventData, playData, p_id, e_id }) => {
  const gamepk = useSelector((state) => state.game.gamepk);
  const { analysisData, loading } = useAnalysisData(gamepk);
  const dispatch = useDispatch();
  const isFirst = eventData.is_first_play && eventData.is_first_event;
  const isLast = eventData.is_last_play && eventData.is_last_event;

  const handleClickLeftArrow = () => {
    if (eventData.is_first_event) {
      const p_id_ = p_id - 1;
      const keys = Object.keys(playData.data[p_id_]);
      const e_id_ = keys[keys.length - 1];
      dispatch(setId({ p_id: p_id_, e_id: e_id_ }));
    } else {
      const p_id_ = p_id;
      let e_id_ = Number(e_id) - 1;
      while (e_id_ > 0 && !playData.data[p_id_][e_id_]) {
        e_id_--;
      }
      dispatch(setId({ p_id: p_id_, e_id: e_id_ }));
    }
  };

  const handleClickRightArrow = () => {
    if (eventData.is_last_event) {
      const p_id_ = p_id + 1;
      const keys = Object.keys(playData.data[p_id_]);
      const e_id_ = keys[0];
      dispatch(setId({ p_id: p_id_, e_id: e_id_ }));
    } else {
      const p_id_ = p_id;
      let e_id_ = Number(e_id) + 1;
      const keys = Object.keys(playData.data[p_id_]);
      while (e_id_ < Number(keys[keys.length - 1]) && !playData.data[p_id_][e_id_]) {
        e_id_++;
      }
      dispatch(setId({ p_id: p_id_, e_id: e_id_ }));
    }
  };

  return (
    <div className="game-controller">
      <div className="game-controller-left-arrow">
        <IconButton
          onClick={handleClickLeftArrow}
          disabled={isFirst}
          color={isFirst ? "disabled" : "primary"}
        >
          <ArrowLeftIcon
            sx={{
              fontSize: 50,
              alignItems: "center",
              cursor: "pointer",
            }}
          />
        </IconButton>
      </div>

      <div className="game-controller-item">
        {loading && <div className="loading">Loading...</div>}
        {!loading && !analysisData && (
          <div className="error-message">
            <p className="error-text no-data">No Data</p>
            {gamepk && <p>Game PK: {gamepk}</p>}
          </div>
        )}
        {!loading && analysisData && <HeatMapItem analysisData={analysisData} />}
      </div>
      <div className="game-controller-right-arrow">
        <IconButton
          onClick={handleClickRightArrow}
          disabled={isLast}
          color={isLast ? "disabled" : "primary"}
        >
          <ArrowRightIcon
            sx={{
              fontSize: 50,
              alignItems: "center",
              cursor: "pointer",
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default GameController;
