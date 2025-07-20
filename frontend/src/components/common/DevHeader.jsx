import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGamePk, setPId, setEId } from "@/store/GameStore";

const Header = () => {
  const dispatch = useDispatch();
  const [gamePk, setGamePkInput] = useState("");
  const [pId, setPIdInput] = useState("");
  const [eId, setEIdInput] = useState("");

  const handleGetDetailById = () => {
    if (gamePk.trim()) {
      dispatch(setGamePk(Number(gamePk)));
    }
  };

  const handleGetId = () => {
    dispatch(setPId(Number(pId)));
    dispatch(setEId(Number(eId)));
  };

  return (
    <header className="header">
      <h1>HOT ZONE Developer mode</h1>
      <div>
        <input
          type="number"
          value={gamePk}
          onChange={(e) => setGamePkInput(e.target.value)}
          placeholder="Game PK を入力"
        />
        <button onClick={handleGetDetailById}>検索</button>
      </div>
      <div>
        <input
          type="number"
          value={pId}
          onChange={(e) => setPIdInput(e.target.value)}
          placeholder="play_id を入力"
        />
        <input
          type="number"
          value={eId}
          onChange={(e) => setEIdInput(e.target.value)}
          placeholder="event_id を入力"
        />
        <button onClick={handleGetId}>検索</button>
      </div>
      <nav>
        <span>ナビゲーション</span>
      </nav>
    </header>
  );
};

export default Header;
