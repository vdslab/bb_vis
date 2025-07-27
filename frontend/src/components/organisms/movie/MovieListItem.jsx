import React, { memo } from "react";
import "@styles/movie.css";

const MovieListItem = memo(({ iframeTag, width, height }) => {
  // iframeTagの中でwidth/heightを動的に設定
  const modifiedIframeTag = iframeTag?.replace(
    /<iframe([^>]*?)>/i,
    `<iframe$1 style="width: ${width}; height: ${height}; border: none;">`,
  );

  return (
    <div className="movie-item">
      <div
        dangerouslySetInnerHTML={{
          __html: modifiedIframeTag || "",
        }}
      />
    </div>
  );
});

MovieListItem.displayName = "MovieListItem";

export default MovieListItem;
