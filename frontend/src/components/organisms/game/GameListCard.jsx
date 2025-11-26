import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setGamePk,
  setHighlightData,
  setSelectedGameAwayTeam,
  setSelectedGameHomeTeam,
  setSelectedGameDate,
  setHighlightFromParallelCoordinates,
} from "@/store/GameStore";
import "@/styles/gamelistcard.css";
import GameListCardDetail from "./GameListCardDetail";
// devonly:start
import { useSelector } from "react-redux";
// devonly:end

//  英語→日本語
const TEAM_NAME_MAP = {
  Diamondbacks: "ダイヤモンドバックス",
  Braves: "ブレーブス",
  Orioles: "オリオールズ",
  "Red Sox": "レッドソックス",
  Cubs: "カブス",
  "White Sox": "ホワイトソックス",
  Reds: "レッズ",
  Guardians: "ガーディアンズ",
  Rockies: "ロッキーズ",
  Tigers: "タイガース",
  Astros: "アストロズ",
  Royals: "ロイヤルズ",
  Angels: "エンゼルス",
  Dodgers: "ドジャース",
  Marlins: "マーリンズ",
  Brewers: "ブルワーズ",
  Twins: "ツインズ",
  Mets: "メッツ",
  Yankees: "ヤンキース",
  Athletics: "アスレチックス",
  Phillies: "フィリーズ",
  Pirates: "パイレーツ",
  Padres: "パドレス",
  Giants: "ジャイアンツ",
  Mariners: "マリナーズ",
  Cardinals: "カージナルス",
  Rays: "レイズ",
  Rangers: "レンジャーズ",
  BlueJays: "ブルージェイズ",
  Nationals: "ナショナルズ",
};

//  日本語変換
const getJPTeamName = (name) => {
  return TEAM_NAME_MAP[name] || null;
};

const GameListCard = ({
  gamepk,
  date,
  hometeam,
  awayteam,
  hometeamscore,
  awayteamscore,
  isHighlighted = false,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (isHighlighted && targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isHighlighted]);

  const handleClick = () => {
    dispatch(setGamePk(gamepk));
    dispatch(setHighlightData(gamepk));
    dispatch(setHighlightFromParallelCoordinates(false));
    dispatch(setSelectedGameDate(date));

    //Redux には英語を渡す
    dispatch(setSelectedGameAwayTeam(awayteam));
    dispatch(setSelectedGameHomeTeam(hometeam));
  };

  //  日本語名を準備
  const homeJP = getJPTeamName(hometeam);
  const awayJP = getJPTeamName(awayteam);


  // devonly:start
  const showGamePk = useSelector((state) => state.debug.showGamePk);
  // devonly:end
  return (
    <>
      <div
        className={`game-list-card ${isHighlighted ? "highlighted" : ""}`}
        onClick={handleClick}
        ref={targetRef}
      >
        {/* devonly:start */}
        {showGamePk && (
          <div
            className="game-list-card-gamepk"
            style={{
              position: "absolute",
              fontSize: "13px",
              right: "4px",
            }}
          >
            {gamepk}
          </div>
        )}
        {/* devonly:end */}
        {isHighlighted && <div className="game-list-card-pulse-indicator" />}
        <div className="game-list-card-date">{date.replace(/-/g, "/")}</div>
        <div className="game-list-card-teams">
          {/* ホームチーム（日本語 → 英語） */}
          <div className="game-list-card-team-name small-team">
            <div>{homeJP || hometeam}</div>
            <div className="team-name-en">{hometeam}</div>
          </div>

          <span className="game-list-card-score score-end">{hometeamscore}</span>
          <span className="game-list-card-score score-center">-</span>
          <span className="game-list-card-score score-start">{awayteamscore}</span>

          {/* アウェーチーム（日本語 → 英語） */}
          <div className="game-list-card-team-name small-team">
            <div>{awayJP || awayteam}</div>
            <div className="team-name-en">{awayteam}</div>
          </div>
        </div>
      </div>
      {isOpen && <GameListCardDetail />}
    </>
  );
};

export default GameListCard;
