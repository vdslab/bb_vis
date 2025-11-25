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
          Help
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
            Search
          </Typography>
          <Typography variant="body2">You can filter games by team and date.</Typography>
        </Box>
        <Divider />

        <Box my={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <ScoreboardIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
            Scores
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            You can check the match date, match situation, and match results in the score. When you
            click on the score you are interested in, it will be highlighted in yellow, and the
            parallel coordination for that day will be highlighted in red. {"\n"}
            At the same time, the video and simulation will be updated.
          </Typography>
        </Box>
        <Divider />

        <Box my={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <LineAxisIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
            The parallel coordination graph
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            The parallel coordination graph allows you to view various indicators for each game
            (time(s), extra base, total score, score difference, lead changes, etc.). {"\n"}
            Drag the axis up and down to filter by that item. {"\n"}
            Click “Clear Brush” in the upper right corner to clear the filter. {"\n"}
            Hovering the mouse over the axis turns it green, and clicking turns it red, switching
            between the video and simulation content.
          </Typography>
        </Box>

        <Divider />

        <Box my={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <OndemandVideoIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
            video
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            In the video, highlight footage showing the match date and competing teams is displayed.
            {"\n"}
            Below each video, a description of the scene is written.{"\n"}
            When you click the video, a dialog opens and the video begins to play.
          </Typography>
        </Box>

        <Divider />

        <Box my={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <SportsBaseballIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
            Simulation
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            In the simulation, the intensity of the game can be seen by the color intensity of the
            heat map. Clicking on the area of interest will display game details (team name, number
            of innings, ball, strike, and out counts) on the board.
            {"\n"}
            At the baseball stadium, you can check the base positions and player information.
          </Typography>
        </Box>
        <Divider />

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <SettingsIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
            References
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
            Major League Baseball Video Search | MLB Film Room
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
          Copyright 2025 MLB Advanced Media, L.P. Use of any content on this page acknowledges
          agreement to the terms posted{" "}
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
