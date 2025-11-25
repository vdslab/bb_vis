import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MovieDialog = ({ isOpen, handleClose, iframeTag, videoTitle, videoUrl }) => {
  // モーダル用：実際の再生を許可
  const playableIframe = iframeTag?.replace(
    /<iframe([^>]*?)src="([^"]+)"([^>]*)>/i,
    `<iframe$1 src="$2?autoplay=1" $3 style="width: 100%; height: 100%; border: none; aspect-ratio: 16/9;" allow="autoplay; fullscreen"></iframe>`,
  );

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}
      >
        {videoTitle}
        <DialogActions>
          <IconButton onClick={handleClose} size="large">
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          backgroundColor: "#000",
          padding: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
          }}
          dangerouslySetInnerHTML={{ __html: playableIframe }}
        />
      </DialogContent>

      <Box py={2} px={3} textAlign="left" bgcolor="#f5f5f5">
        <Typography variant="body2" color="textSecondary">
          動画URL:{" "}
          <Link href={videoUrl} target="_blank" rel="noopener noreferrer" underline="hover">
            {videoUrl}
          </Link>
        </Typography>
      </Box>
    </Dialog>
  );
};

export default MovieDialog;
