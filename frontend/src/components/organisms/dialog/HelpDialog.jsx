import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Link,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SettingsIcon from "@mui/icons-material/Settings";

const HelpDialog = ({ isOpen, handleClose }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Typography variant="h6" component="span">
          ヘルプ
        </Typography>
        <DialogActions>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogActions>
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: "#f9f9f9" }}>
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <SearchIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Search
          </Typography>
          <Typography variant="body2">
            チームと日付で絞り込み検索ができます。
          </Typography>
        </Box>

        <Divider />

        <Box my={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <LineAxisIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Parallel Coordinates
          </Typography>
          <Typography variant="body2">
            パラレルコーディネートグラフでは、time(s)、Extra Base、Total Score、
            Score Difference、Lead Changes などの指標を見ることができます。
            各項目をクリックすると、右上の動画とシミュレーションの内容が切り替わります。
          </Typography>
        </Box>

        <Divider />

        <Box my={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <SportsBaseballIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Simulation
          </Typography>
          <Typography variant="body2">
            シミュレーションでは、ヒートマップの色の濃さで試合の盛り上がり度合いが分かります。
            気になる箇所をクリックすると、ゲームの詳細（チーム名、イニング数、ボール・ストライク・アウトのカウント）が更新されます。
            野球場では出塁位置、選手の情報を確認できます。
          </Typography>
        </Box>
        <Divider />

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <SettingsIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            参照したもの
          </Typography>
          <Link
            href="https://hpgpixer.jp/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            ピクセルガロー
          </Link>

          <Divider />

          <Link
            href="https://www.mlb.com/ja/video"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            Major League Baseball Video Search | MLB Film Room
          </Link>

          <Divider />

          <Link
            href="https://devpost.com/software/mlb-gumbo-data-access"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            MLB GUMBOデータアクセス
          </Link>
        </Box>
      </DialogContent>

      <Box py={2} textAlign="center">
        <Typography variant="caption" color="textSecondary">
          Copyright 2025 MLB Advanced Media, L.P. Use of any content on this
          page acknowledges agreement to the terms posted{" "}
          <Link
            href="http://gdx.mlb.com/components/copyright.txt"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            here
          </Link>
          .
        </Typography>
      </Box>
    </Dialog>
  );
};

export default HelpDialog;
