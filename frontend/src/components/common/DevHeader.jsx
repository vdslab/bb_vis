import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGamePk } from "@/store/GameStore";

const Header = () => {
  const dispatch = useDispatch();
  const [gamePk, setGamePkInput] = useState("");

  const handleGetDetailById = () => {
    if (gamePk.trim()) {
      dispatch(setGamePk(Number(gamePk)));
    }
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
      <nav>
        <span>ナビゲーション</span>
      </nav>
    </header>
  );
};

export default Header;
