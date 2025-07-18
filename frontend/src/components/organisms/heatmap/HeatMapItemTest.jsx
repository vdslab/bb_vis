import { useEffect, useRef, useCallback } from "react";
import { interpolateBlues } from "d3-scale-chromatic";

const HeatMapItemTest = ({ data, width = 750, height = 400 }) => {
  const canvasRef = useRef(null);

  const drawHeatmap = useCallback(
    (ctx, data) => {
      // データの範囲を計算
      let minY = Infinity;
      let maxY = -Infinity;

      data.forEach((row) => {
        row.data.forEach((item) => {
          if (item.y < minY) minY = item.y;
          if (item.y > maxY) maxY = item.y;
        });
      });

      // スケール関数を作成（0-1の範囲に正規化）
      const scaleY = (value) => {
        if (maxY === minY) return 0.5; // すべて同じ値の場合
        return (value - minY) / (maxY - minY);
      };

      // NOTE:実験部分
      // データを描画(通常)
      data.forEach((row, idx) => {
        row.data.forEach((item) => {
          // item.yの値を0-1の範囲に正規化してからbluesスケールで色を決定
          const normalizedValue = scaleY(item.y);
          const color = interpolateBlues(normalizedValue);

          ctx.fillStyle = color;
          ctx.fillRect(item.x * 4, 10 + idx * 20, 4, 20);
        });
      });

      // データを描画(長さスケール)
      data.forEach((row, idx) => {
        row.data.forEach((item) => {
          // item.yの値を0-1の範囲に正規化してからbluesスケールで色を決定
          const normalizedValue = scaleY(item.y);
          const color = interpolateBlues(normalizedValue);
          ctx.fillStyle = color;

          const length = (width - 60) / row.data.length;

          ctx.fillRect(item.x * length, 10 + idx * 20 + 200, length, 20);
        });
      });

      // 間の線
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 200);
      ctx.lineTo(width, 200);
      ctx.stroke();

      // NOTE:実験部分終わり

      // 罫線を描画
      ctx.strokeStyle = "#e0e0e0";
      ctx.lineWidth = 1;

      // 縦線を描画
      for (let x = 0; x <= width; x += 4) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 横線を描画
      for (let y = 10; y <= height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    },
    [width, height],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      // キャンバスをクリア
      ctx.clearRect(0, 0, width, height);

      // データを描画
      drawHeatmap(ctx, data);
    }
  }, [data, drawHeatmap, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
export default HeatMapItemTest;
