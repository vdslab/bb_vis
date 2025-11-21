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
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

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
						<SearchIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
						検索
					</Typography>
					<Typography variant="body2">
						チームと日付で試合を絞り込むことができます。
					</Typography>
				</Box>
				<Divider />

				<Box my={3}>
					<Typography variant="subtitle1" fontWeight="bold" gutterBottom>
						<ScoreboardIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
						スコア
					</Typography>
					<Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
						スコアでは、試合日や状況、結果を確認できます。
						気になるスコアをクリックすると黄色でハイライトされ、その日のパラレルコーディネーションが赤で強調されます。
						{"\n"}
						ゲームビューをクリックすると、シミュレーションとハイライト動画がポップアップして表示されます。
					</Typography>
				</Box>
				<Divider />

				<Box my={3}>
					<Typography variant="subtitle1" fontWeight="bold" gutterBottom>
						<LineAxisIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
						パラレルコーディネーション（並列座標プロット）
					</Typography>
					<Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
						各試合の指標（プレイ時間、長打、総得点、点差、リード変化など）を可視化したグラフです。
						{"\n"}
						軸を上下にドラッグすることで、その項目でフィルタできます。
						{"\n"}
						右上の「Reset」をクリックするとフィルタが解除されます。
						{"\n"}
						軸にマウスを乗せると緑色に、クリックすると赤色になり、その試合のスコアの部分が強調されます。
					</Typography>
				</Box>

				<Divider />

				<Box my={3}>
					<Typography variant="subtitle1" fontWeight="bold" gutterBottom>
						<OndemandVideoIcon
							fontSize="small"
							sx={{ verticalAlign: "middle", mr: 1 }}
						/>
						動画
					</Typography>
					<Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
						動画では、試合日と対戦チームに関連したハイライト映像が表示されます。
						{"\n"}
						各動画の下にはシーンの説明文があります。
						{"\n"}
						動画をクリックするとダイアログが開き、再生を再生できます。
					</Typography>
				</Box>

				<Divider />

				<Box my={3}>
					<Typography variant="subtitle1" fontWeight="bold" gutterBottom>
						<SportsBaseballIcon
							fontSize="small"
							sx={{ verticalAlign: "middle", mr: 1 }}
						/>
						シミュレーション
					</Typography>
					<Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
						シミュレーションでは、ヒートマップの色の濃さで試合の盛り上がりが濃さで視覚化されています。
						気になる箇所をクリックすると、試合詳細（チーム名、イニング数、ボール・ストライク・アウトのカウント）がグラウンドに表示されます。
						{"\n"}
						球場では、塁上のランナー位置や選手情報を確認できます。
					</Typography>
				</Box>
				<Divider />

				<Box mt={3}>
					<Typography variant="subtitle1" fontWeight="bold" gutterBottom>
						<SettingsIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
						参考サイト
					</Typography>
					<Link
						href="https://hpgpixer.jp/"
						target="_blank"
						rel="noopener noreferrer"
						underline="hover"
					>
						Pixel Garo
					</Link>

					<Divider />

					<Link
						href="https://www.mlb.com/ja/video"
						target="_blank"
						rel="noopener noreferrer"
						underline="hover"
					>
						MLB Film Room（メジャーリーグ公式動画検索）
					</Link>

					<Divider />

					<Link
						href="https://devpost.com/software/mlb-gumbo-data-access"
						target="_blank"
						rel="noopener noreferrer"
						underline="hover"
					>
						MLB GUMBO Data Access
					</Link>
				</Box>
			</DialogContent>

			<Box py={2} textAlign="center">
				<Typography variant="caption" color="textSecondary">
					Copyright 2025 MLB Advanced Media, L.P.
					本ページ内のコンテンツを使用することで、以下の利用規約に同意したものとみなされます{" "}
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
