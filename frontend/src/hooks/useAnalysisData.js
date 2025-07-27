import { useState, useEffect } from "react";
import { GameDetailService } from "@/service/GameDetailService";

export const useAnalysisData = (gamepk) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  // gamepkListが変更されるたびに自動的にデータを取得
  useEffect(() => {
    if (!gamepk) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GameDetailService.getAnalysisById(gamepk);
        console.log(data);
        setAnalysisData(data);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
        setAnalysisData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gamepk]);

  return {
    analysisData,
    loading,
  };
};
