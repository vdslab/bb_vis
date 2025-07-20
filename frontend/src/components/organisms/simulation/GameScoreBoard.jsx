import "@/styles/simulation.css";
import { useEffect, useRef } from "react";

const GameScoreBoard = () => {
  const canvasRef = useRef(null);

  // length
  const labelHeight = 0.16;
  const awayTeamHeight = 0.25;
  const homeTeamHeight = 0.48;
  const teamWidth = 0.195;
  const blockHeight = 0.16;
  const blockWidth = 0.03;
  const blockGap = 0.047;

  // color
  const gray = "#daddd5";
  const white = "#d5d1c8";
  const black = "#192123";
  const green = "#3e5a51";
  const green2 = "#2d493f";

  // font
  const textFont = "bold 20px Arial";

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

      // チーム名
      // ctx.fillStyle = white;
      // ctx.font = textFont;
      // ctx.textAlign = "center";
      // ctx.textBaseline = "middle";
      // ctx.fillText(
      //   "T E A M",
      //   canvas.width * 0.155,
      //   canvas.height * labelHeight,
      // );

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
  }, []);

  return (
    <div className="game-score-board">
      <div className="scoreboard-container">
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

export default GameScoreBoard;
