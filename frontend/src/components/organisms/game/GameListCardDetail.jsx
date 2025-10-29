import React from "react";
import { useDispatch } from "react-redux";
import { setIsDialogOpen } from "@/store/GameStore";
import "@styles/gamelistcarddetail.css"

const GameListCardDetail = () => {
  // アコーディオンで試合の情報を表示する
  // cssで大きさを決める
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsDialogOpen(true));
  };

  return (
    <div className="game-list-card-detail">
      <div className="game-list-card-detail-upper">
        <a>試合情報</a>
        <a>何を表示するかは考えていない</a>
      </div>
      <div className="game-list-card-detail-under">
        <button onClick={handleClick}>
          ダイアログへ
        </button>
      </div>
    </div>
  );
}

export default GameListCardDetail;