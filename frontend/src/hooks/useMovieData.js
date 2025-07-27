import { useState, useEffect, useRef } from "react";
import { GameDetailService } from "@/service/GameDetailService";

export const useMovieData = (gamepk) => {
  const [moviesIframeTags, setMoviesIframeTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const cacheRef = useRef(new Map());
  const lastGamepkRef = useRef(null);

  // gamepkが変更されるたびに自動的にデータを取得
  useEffect(() => {
    if (!gamepk) return;

    // 同じgamepkの場合は再取得しない
    if (lastGamepkRef.current === gamepk && cacheRef.current.has(gamepk)) {
      setMoviesIframeTags(cacheRef.current.get(gamepk));
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await GameDetailService.getMoviesById(gamepk);

        // キャッシュに保存
        cacheRef.current.set(gamepk, res);
        lastGamepkRef.current = gamepk;

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
