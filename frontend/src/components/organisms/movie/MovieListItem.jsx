import React, { memo } from "react";
import "@styles/movie.css";

const MovieListItem = memo(({ iframeTag }) => {
  // iframeTagの中でwidth/heightを動的に設定
  const modifiedIframeTag = iframeTag?.replace(
    /<iframe([^>]*?)>/i,
    `<iframe$1 style="width: 100%; height: 100%; border: none; aspect-ratio: 16/9;">`,
  );

  return (
    <div className="movie-item">
      <div className="movie-item-iframe"
        dangerouslySetInnerHTML={{
          __html: modifiedIframeTag || "",
        }}
      />
      <div className="movie-item-description">
        description
      </div>
    </div>
  );
});

MovieListItem.displayName = "MovieListItem";

export default MovieListItem;
