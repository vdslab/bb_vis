import { useState, useEffect } from "react";
import { GameDetailService } from "@/service/GameDetailService";

export const useMovieData = (gamepk) => {
  const [moviesIframeTags, setMoviesIframeTags] = useState([]);
  const [loading, setLoading] = useState(false);

  // gamepkが変更されるたびに自動的にデータを取得
  useEffect(() => {
    if (!gamepk) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await GameDetailService.getMoviesById(gamepk);
        setMoviesIframeTags(res);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gamepk]);

  return {
    moviesIframeTags,
    loading,
  };
};
