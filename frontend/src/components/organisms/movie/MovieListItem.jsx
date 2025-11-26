import React, { memo, useState } from "react";
import "@styles/movie.css";
import MovieDialog from "../dialog/MovieDialog";

const MovieListItem = memo(({ iframeTag }) => {
  // iframeTagの中でwidth/heightを動的に設定
  // const modifiedIframeTag = iframeTag?.replace(
  //   /<iframe([^>]*?)>/i,
  //   `<iframe$1 style="width: 100%; height: 100%; border: none; aspect-ratio: 16/9;">`,
  // );

  const extractDescription = (iframeTag) => {
    if (!iframeTag) return "Video description";

    const srcMatch = iframeTag.match(/src="([^"]+)"/);
    if (!srcMatch) return "Video description";

    const url = srcMatch[1];
    const videoId = url.split("/").pop()?.split("?")[0];

    if (!videoId) return "Video description";

    return videoId.replace(/-/g, " ");
  };

  const extractMovieUrl = (tag) => {
    const srcMatch = tag?.match(/src="([^"]+)"/);
    const src = srcMatch?.[1] || "";
    const movieName = src.split("/").pop()?.split("?")[0] || "動画再生";
    const movieUrl =
      "https://www.mlb.com/video/" + movieName + "?partnerId=web_video-game-index-page_video-share";
    return movieUrl;
  };

  const description = extractDescription(iframeTag);

  const movieUrl = extractMovieUrl(iframeTag);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const thumbnailIframe = iframeTag?.replace(
    /<iframe([^>]*?)src="([^"]+)"([^>]*)>/i,
    `<iframe$1 src="$2" $3 style="width: 100%; height: 100%; border: none; aspect-ratio: 16/9; pointer-events: none;"fullscreen"></iframe>`,
  );
  return (
    <div className="movie-item">
      <div
        className="movie-item-iframe"
        onClick={handleOpen}
        dangerouslySetInnerHTML={{
          __html: thumbnailIframe || "",
        }}
      />
      <div className="movie-item-description">{description}</div>
      <MovieDialog
        isOpen={isOpen}
        handleClose={handleClose}
        iframeTag={iframeTag}
        videoTitle={description}
        videoUrl={movieUrl}
      />
    </div>
  );
});

MovieListItem.displayName = "MovieListItem";

export default MovieListItem;
