import MovieListItem from "./MovieListItem";

const MovieList = ({ iframeTags, width, height }) => {
  return (
    <div className="movie-list">
      {iframeTags.map((iframeTag, index) => (
        <MovieListItem
          key={index}
          iframeTag={iframeTag}
          width={width}
          height={height}
        />
      ))}
    </div>
  );
};

export default MovieList;
