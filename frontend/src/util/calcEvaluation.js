export const calcEvaluation = (analysisData) => {
  let evaluation_score = 0;

  // 評価の閾値を設定
  const THRESHOLD_VALUE = 80;

  // 評価のスコアを計算
  let game_size = analysisData.data.length;
  let beyond_threshold_count = 0;
  analysisData.data.forEach((item) => {
    if (item.y > THRESHOLD_VALUE) {
      beyond_threshold_count += 1;
    }
  });

  // 閾値を超えている割合を計算
  evaluation_score = (beyond_threshold_count / game_size) * 100;

  return evaluation_score;
};
