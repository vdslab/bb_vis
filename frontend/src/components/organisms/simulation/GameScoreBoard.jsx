import "@/styles/simulation.css";
import { useEffect, useRef } from "react";

const GameScoreBoard = ({ metaData, eventData }) => {
  const canvasRef = useRef(null);

  // length
  const labelHeight = 0.16;
  const awayTeamHeight = 0.25;
  const homeTeamHeight = 0.48;
  const teamWidth = 0.195;
  const blockHeight = 0.16;
  const blockWidth = 0.03;
  const blockGap = 0.047;

  const awayTeamTextHeight = 0.34;
  const homeTeamTextHeight = 0.57;
  // color
  const gray = "#daddd5";
  const white = "#d5d1c8";
  const black = "#192123";
  const green = "#3e5a51";
  const green2 = "#2d493f";

  // font
  const textFont = "bold 20px Arial";
  const teamFont2 = "bold 17px Arial";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawCanvas = () => {
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();

      // Canvasのサイズを設定
      canvas.width = rect.width;
      canvas.height = rect.height;

      // 枠線担当
      ctx.fillStyle = gray;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 内側の四角形
      ctx.fillStyle = green;
      ctx.fillRect(4, 4, canvas.width - 8, canvas.height - 8);

      ctx.fillStyle = black;
      ctx.fillRect(
        canvas.width * 0.04,
        canvas.height * awayTeamHeight,
        canvas.width * teamWidth,
        canvas.height * blockHeight,
      );

      ctx.fillRect(
        canvas.width * 0.04,
        canvas.height * homeTeamHeight,
        canvas.width * teamWidth,
        canvas.height * blockHeight,
      );

      // イニング
      for (let i = 0; i < 11; i++) {
        const c = i < 10 ? i + 1 : "R";
        ctx.fillStyle = black;

        // イニングナンバー
        ctx.fillStyle = white;
        ctx.font = textFont;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          c,
          canvas.width * (0.282 + blockGap * i),
          canvas.height * labelHeight,
        );

        ctx.fillStyle = black;
        // イニングナンバーの四角形
        ctx.fillRect(
          canvas.width * (0.267 + blockGap * i),
          canvas.height * awayTeamHeight,
          canvas.width * blockWidth,
          canvas.height * blockHeight,
        );
        ctx.fillRect(
          canvas.width * (0.267 + blockGap * i),
          canvas.height * homeTeamHeight,
          canvas.width * blockWidth,
          canvas.height * blockHeight,
        );
      }

      // BSO
      ctx.fillStyle = green2;
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(
          canvas.width * 0.79,
          canvas.height * (labelHeight - 0.03 + (blockHeight + 0.02) * i),
          canvas.width * blockWidth,
          canvas.height * blockHeight,
        );
      }
      ctx.fillStyle = white;
      ctx.font = textFont;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "B",
        canvas.width * 0.805,
        canvas.height * (labelHeight + 0.05),
      );
      ctx.fillText(
        "S",
        canvas.width * 0.805,
        canvas.height * (labelHeight + 0.235),
      );
      ctx.fillText(
        "O",
        canvas.width * 0.805,
        canvas.height * (labelHeight + 0.42),
      );

      // count
      ctx.fillStyle = black;
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(
          canvas.width * 0.825,
          canvas.height * (labelHeight - 0.03 + (blockHeight + 0.02) * i),
          canvas.width * 0.142,
          canvas.height * blockHeight,
        );
      }

      if (!eventData) {
        return;
      }

      // 動的処理
      // team
      ctx.fillStyle = white;
      ctx.font = teamFont2;
      ctx.textAlign = "left";
      // ctx.textBaseline = "top";
      ctx.fillText(
        metaData.team.away,
        canvas.width * 0.045,
        canvas.height * awayTeamTextHeight,
      );
      ctx.fillText(
        metaData.team.home,
        canvas.width * 0.045,
        canvas.height * homeTeamTextHeight,
      );

      // inning_score
      ctx.fillStyle = white;

      for (let i = 0; i < 10; i++) {
        const away_score = eventData.score_board.away[i + 1] ?? "";
        const home_score = eventData.score_board.home[i + 1] ?? "";
        console.log(away_score, home_score);
        // away_score
        ctx.font = textFont;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          away_score,
          canvas.width * (0.282 + blockGap * i),
          canvas.height * awayTeamTextHeight,
        );

        // home_score
        ctx.font = textFont;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          home_score,
          canvas.width * (0.282 + blockGap * i),
          canvas.height * homeTeamTextHeight,
        );
      }

      // total_score
      const away_pos_score = eventData.team_score.away.pos_score;
      const home_pos_score = eventData.team_score.home.pos_score;

      ctx.fillStyle = white;
      ctx.font = textFont;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        away_pos_score,
        canvas.width * (0.282 + blockGap * 10),
        canvas.height * awayTeamTextHeight,
      );
      ctx.fillText(
        home_pos_score,
        canvas.width * (0.282 + blockGap * 10),
        canvas.height * homeTeamTextHeight,
      );

      // BSO
      // TODO: エッジケースの処理
      if (eventData.detail.count.balls > 3) {
        eventData.detail.count.balls = 3;
      }
      if (eventData.detail.count.strikes > 2) {
        eventData.detail.count.strikes = 2;
      }
      if (eventData.detail.count.outs > 2) {
        eventData.detail.count.outs = 2;
      }

      // B
      for (let i = 0; i < eventData.detail.count.balls; i++) {
        ctx.fillStyle = white;
        /* 円の描画 */
        ctx.beginPath(); // パスの初期化
        ctx.arc(
          canvas.width * (0.845 + 0.035 * i),
          canvas.height * (labelHeight + 0.05),
          canvas.height * 0.06,
          0,
          2 * Math.PI,
        );
        ctx.closePath();
        ctx.fill();
      }

      // S
      for (let i = 0; i < eventData.detail.count.strikes; i++) {
        ctx.fillStyle = white;
        /* 円の描画 */
        ctx.beginPath(); // パスの初期化
        ctx.arc(
          canvas.width * (0.845 + 0.035 * i),
          canvas.height * (labelHeight + 0.231),
          canvas.height * 0.06,
          0,
          2 * Math.PI,
        );
        ctx.closePath();
        ctx.fill();
      }
      // 0
      for (let i = 0; i < eventData.detail.count.outs; i++) {
        ctx.fillStyle = white;
        /* 円の描画 */
        ctx.beginPath();
        ctx.arc(
          canvas.width * (0.845 + 0.035 * i),
          canvas.height * (labelHeight + 0.412),
          canvas.height * 0.06,
          0,
          2 * Math.PI,
        );
        ctx.closePath();
        ctx.fill();
      }
    };

    // 初回描画
    drawCanvas();

    // リサイズイベントを監視
    const handleResize = () => {
      drawCanvas();
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [eventData, metaData]);

  return (
    <div className="game-score-board">
      <div className="scoreboard-container">
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

export default GameScoreBoard;
