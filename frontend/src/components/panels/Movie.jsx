import { useSelector } from "react-redux";
import { useState } from "react";
import { useMovieData } from "@/hooks/useMovieData";
import MovieList from "../organisms/movie/MovieList";

const Movie = () => {
const gamepk = useSelector((state) => state.game.gamepk);

  const { moviesIframeTags, loading } = useMovieData(gamepk);
  const [iframeWidth, setIframeWidth] = useState("30%");
  const [iframeHeight, setIframeHeight] = useState("100px");

  return (
    <div className="panel-screen movie-panel">
      <div className="panel-content">
        <button onClick={handleGetDetailById} disabled={loading}>
          {loading ? "Loading..." : "データ取得"}
        </button>
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
