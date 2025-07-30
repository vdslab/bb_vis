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
        const data = await GameDetailService.getAnalysisDataById(gamepk);
        console.log(data);
        // オブジェクトを配列の1要素目として変換
        const analysisDataArray = data ? [data] : null;
        setAnalysisData(analysisDataArray);
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
