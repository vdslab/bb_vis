import React, { memo } from "react";
import "@styles/movie.css";

const MovieListItem = memo(({ iframeTag }) => {
  // iframeTagの中でwidth/heightを動的に設定
  const modifiedIframeTag = iframeTag?.replace(
    /<iframe([^>]*?)>/i,
    `<iframe$1 style="width: 100%; height: 100%; border: none; aspect-ratio: 16/9;">`,
  );

  const extractDescription = (iframeTag) => {
    if (!iframeTag) return "Video description";
    
    const srcMatch = iframeTag.match(/src="([^"]+)"/);
    if (!srcMatch) return "Video description";
    
    const url = srcMatch[1];
    const videoId = url.split('/').pop()?.split('?')[0];
    
    if (!videoId) return "Video description";
    
    return videoId.replace(/-/g, ' ');
  };

  const description = extractDescription(iframeTag);

  return (
    <div className="movie-item">
      <div className="movie-item-iframe"
        dangerouslySetInnerHTML={{
          __html: modifiedIframeTag || "",
        }}
      />
      <div className="movie-item-description">
        {description}
      </div>
    </div>
  );
});

MovieListItem.displayName = "MovieListItem";

export default MovieListItem;
