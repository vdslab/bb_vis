import "@/styles/parallelcoordinates.css";
import ParallelCoordinatesItem from "../organisms/parallelcoordinates/ParallelCoordinatesItem";
import { useState } from "react";
import Button from "../atoms/Button";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

const ParallelCoordinates = () => {
  const [brushDeleteFlag, setBrushDeleteFlag] = useState(false);
  const [openHelp, setOpenHelp] = useState(false); // ← ヘルプ用

  const handleClearBrush = () => {
    setBrushDeleteFlag(!brushDeleteFlag);
  };

  return (
    <div className="panel-screen parallel-panel">
      <div className="panel-header" style={{ display: "flex", alignItems: "center" }}>
        {/* ▼ タイトル ＋ ? ボタン */}
        <Box display="flex" alignItems="center" gap={1}>
          <h2 style={{ margin: 0 }}>試合特徴比較チャート</h2>
          <IconButton size="small" onClick={() => setOpenHelp(true)}>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Box>

        <Button onClick={handleClearBrush} style={{ marginLeft: "auto" }}>
          ブラッシング解除
        </Button>
      </div>

      {/* ▼ ヘルプダイアログ */}
      <Dialog open={openHelp} onClose={() => setOpenHelp(false)} maxWidth="sm" fullWidth>
        <DialogTitle>試合特徴比較チャートについて</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            各試合の指標（プレイ時間、長打、総得点、点差、リード変化など）を可視化したグラフです。
            {"\n\n"}● 軸を上下にドラッグ … その項目でフィルタできます。{"\n"}● 「ブラッシング解除」
            … フィルタを解除します。{"\n"}● 線にマウスを乗せる … 緑色に強調されます。{"\n"}●
            線をクリック … 赤色になり、その試合が強調表示されます。
          </Typography>
        </DialogContent>
      </Dialog>

      <div className="panel-content parallelcoordinates-content">
        <div className="parallel-coordinates-container">
          <ParallelCoordinatesItem brushDeleteFlag={brushDeleteFlag} />
        </div>
      </div>
    </div>
  );
};

export default ParallelCoordinates;
