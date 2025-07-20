import { useState, useEffect } from "react";
import { GameDetailService } from "@/service/GameDetailService";

export const usePlayData = (gamepk) => {
  const [playData, setPlayData] = useState({});
  const [loading, setLoading] = useState(false);

  // gamepkが変更されるたびに自動的にデータを取得
  useEffect(() => {
    if (!gamepk) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await GameDetailService.getPlayDataById(gamepk);
        setPlayData(res);
      } catch (error) {
        console.error("Error fetching play data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gamepk]);

  return {
    playData,
    loading,
  };
};
