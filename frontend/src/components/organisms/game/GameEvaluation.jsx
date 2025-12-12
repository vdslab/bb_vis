import "@/styles/gamelistcarddetail.css";
import { useSelector } from "react-redux";

const GameEvaluation = ({ gamepk }) => {
  const gameData = useSelector((state) => state.game.gameData);
  const evaluation_score = gameData.find((item) => item.gamepk === gamepk).evaluation_score;

  // スコアに基づいてランクを決定
  const getRank = (score) => {
    if (score >= 15) return { rank: "S+", color: "#FFE066", label: "超熱戦" };
    if (score >= 12) return { rank: "S", color: "#FF6B9D", label: "激アツ" };
    if (score >= 9) return { rank: "A", color: "#FF9A76", label: "好試合" };
    if (score >= 6) return { rank: "B", color: "#68D8D6", label: "良試合" };
    if (score >= 3) return { rank: "C", color: "#C0C5CE", label: "普通" };
    return { rank: "D", color: "#A0A0A0", label: "低調" };
  };

  const { rank, color, label } = getRank(evaluation_score);

  return (
    <div className="game-evaluation-container">
      <div className="evaluation-title">盛り上がり度</div>
      <div className="evaluation-content">
        <div className="evaluation-rank" style={{ color: color }}>
          {rank}
        </div>
        <div className="evaluation-info">
          <div className="evaluation-label">{label}</div>
          <div className="evaluation-score">{evaluation_score.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};

export default GameEvaluation;
