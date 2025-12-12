import React, { useState, useEffect } from "react";
import GameList from "../organisms/game/GameList";
import { useSelector } from "react-redux";

import { Box, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Game = () => {
  const filteredGamePks = useSelector((state) => state.game.filteredGamePks);
  const brushFilteredGamePks = useSelector((state) => state.game.brushFilteredGamePks);
  const highlightData = useSelector((state) => state.game.highlightData);
  const gameData = useSelector((state) => state.game.gameData);
  const isDataLoaded = useSelector((state) => state.game.isDataLoaded);
  const [data, setData] = useState([]);

  const [openHelp, setOpenHelp] = useState(false); // ← 追加（ヘルプ用）

  useEffect(() => {
    if (!isDataLoaded || gameData.length === 0) return;

    const gamePksToUse = brushFilteredGamePks !== null ? brushFilteredGamePks : filteredGamePks;

    const filteredData = gamePksToUse
      .map((gamepk) => gameData.find((item) => item.gamepk === gamepk))
      .filter((item) => item !== undefined);

    setData(filteredData);
  }, [gameData, isDataLoaded, filteredGamePks, brushFilteredGamePks]);

  return (
    <div className="panel-screen game-panel">
      <div className="panel-header" style={{ display: "flex", alignItems: "center" }}>
        {/* ▼ タイトル横に ? アイコン */}
        <Box display="flex" alignItems="center" gap={1}>
          <h2 style={{ margin: 0 }}>試合リスト</h2>
          <IconButton size="small" onClick={() => setOpenHelp(true)}>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </div>

      {/* ▼ ヘルプダイアログ */}
      <Dialog open={openHelp} onClose={() => setOpenHelp(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <ScoreboardIcon
            fontSize="small"
            style={{ verticalAlign: "middle", marginRight: "6px" }}
          />
          スコアについて
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            スコアでは、試合日や状況、結果を確認できます。
            気になるスコアをクリックすると黄色でハイライトされ、
            その日のパラレルコーディネーションが赤で強調されます。
            {"\n\n"}
            ゲームの詳細をクリックすると、シミュレーションと
            ハイライト動画がポップアップで表示されます。
          </Typography>
        </DialogContent>
      </Dialog>

      {/* ▼ 本体 */}
      <div className="panel-content" style={{ textAlign: "center" }}>
        {data.length === 0 ? (
          <div className="no-data-container">
            <p className="scores-no-data-text">No Data</p>
          </div>
        ) : (
          <GameList games={data} highlightData={highlightData} />
        )}
      </div>
    </div>
  );
};

export default Game;
