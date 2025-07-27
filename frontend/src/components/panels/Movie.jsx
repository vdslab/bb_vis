import { useSelector } from "react-redux";
import { memo, useMemo } from "react";
import { useMovieData } from "@/hooks/useMovieData";
import MovieList from "../organisms/movie/MovieList";

const Movie = memo(() => {
  const gamepk = useSelector((state) => state.game.gamepk);

  const { moviesIframeTags, loading } = useMovieData(gamepk);

  // iframeWidthとiframeHeightをメモ化
  const { iframeWidth, iframeHeight } = useMemo(
    () => ({
      iframeWidth: "auto",
      iframeHeight: "100%",
    }),
    [],
  );

  return (
    <div className="panel-screen movie-panel">
      <div className="panel-content">
        {loading && <div className="loading">Loading...</div>}
        <div className="movie-list">
          <MovieList
            iframeTags={moviesIframeTags}
            width={iframeWidth}
            height={iframeHeight}
          />
        </div>
      </div>
    </div>
  );
});

Movie.displayName = "Movie";

export default Movie;
