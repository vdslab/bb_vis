import { useSelector } from "react-redux";
import { useState } from "react";
import { useMovieData } from "@/hooks/useMovieData";
import MovieList from "../organisms/movie/MovieList";

const Movie = () => {
  const gamepk = useSelector((state) => state.game.gamepk);

  const { moviesIframeTags, loading } = useMovieData(gamepk);
  const [iframeWidth] = useState("auto");
  const [iframeHeight] = useState("100%");

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
};

export default Movie;
