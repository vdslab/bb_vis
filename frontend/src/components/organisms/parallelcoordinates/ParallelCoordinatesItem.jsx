import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setGamePk } from "../../../store/GameStore";
import { useSelector } from "react-redux";

const ParallelCoordinatesItem = () => {
  const dispatch = useDispatch();
  const selectedTeam = useSelector((state) => state.game.selectedTeam);
  const selectedDate = useSelector((state) => state.game.selectedDate);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [data, setData] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  // ハイライト用データ、テスト用
  const [highlightData, setHighlightData] = useState(null);

  // コンテナのサイズを監視してキャンバスサイズを調整
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    // 初期サイズ設定
    updateCanvasSize();

    // リサイズイベントリスナー
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // ウィンドウリサイズ時にも更新
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  // データを読み込む
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/2025-03-16-2025-07-14.json");
        const jsonData = await response.json();

        // チームフィルタリング
        let filteredData = jsonData;
        if (selectedTeam !== "All") {
          filteredData = jsonData.filter(
            (item) =>
              item.team.home === selectedTeam ||
              item.team.away === selectedTeam,
          );
        }

        // 日付フィルタリング
        if (selectedDate.startDate || selectedDate.endDate) {
          filteredData = filteredData.filter((item) => {
            const itemDate = item.date;
            const startDate = selectedDate.startDate;
            const endDate = selectedDate.endDate;

            if (startDate && endDate) {
              return itemDate >= startDate && itemDate <= endDate;
            } else if (startDate) {
              return itemDate >= startDate;
            } else if (endDate) {
              return itemDate <= endDate;
            }
            return true;
          });
        }

        setData(filteredData);
      } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
      }
    };
    loadData();
  }, [selectedTeam, selectedDate]);

  // データの正規化
  const normalizeData = (data, key) => {
    if (!data || data.length === 0) {
      return [];
    }

    const values = data.map((d) => d[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // データが一つしかない場合、または全て同じ値の場合は0.5を返す（中央に表示）
    if (data.length === 1 || min === max) {
      return data.map((d) => ({
        ...d,
        [key + "_normalized"]: 0.5,
      }));
    }

    return data.map((d) => ({
      ...d,
      [key + "_normalized"]: (d[key] - min) / (max - min),
    }));
  };

  // 2点間の距離を計算する関数
  function getDistanceToLineSegment(x1, y1, x2, y2, px, py) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) param = dot / len_sq;

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // パラレルコーディネートを描画
  useEffect(() => {
    if (
      !data.length ||
      !canvasRef.current ||
      dimensions.width === 0 ||
      dimensions.height === 0
    ) {
      // データが空の場合は空のキャンバスを表示
      const canvas = canvasRef.current;
      if (canvas && dimensions.width > 0 && dimensions.height > 0) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);

        // データがないことを示すメッセージを表示
        ctx.fillStyle = "#666";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "データがありません",
          dimensions.width / 2,
          dimensions.height / 2,
        );
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // キャンバスのサイズを設定
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // キャンバスをクリア
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // 特徴量の定義
    const features = [
      { key: "time", label: "Time (s)", color: "#FF6B6B" },
      { key: "ex_base_hit_cnt", label: "Extra Base Hits", color: "#4ECDC4" },
      { key: "total_score", label: "Total Score", color: "#45B7D1" },
      { key: "diff_score", label: "Score Difference", color: "#96CEB4" },
      { key: "lead_change_cnt", label: "Lead Changes", color: "#FFEAA7" },
    ];

    // データを正規化
    let normalizedData = [...data];
    features.forEach((feature) => {
      normalizedData = normalizeData(normalizedData, feature.key);
    });

    const margin = { top: 40, bottom: 40, left: 60, right: 60 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;
    const axisSpacing = chartWidth / (features.length - 1);

    // 軸を描画
    features.forEach((feature, index) => {
      const x = margin.left + index * axisSpacing;

      // 軸線
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + chartHeight);
      ctx.stroke();

      // 軸ラベル
      ctx.fillStyle = "#333";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(feature.label, x, margin.top - 10);

      // 目盛り
      const values = data.map((d) => d[feature.key]);
      const min = Math.min(...values);
      const max = Math.max(...values);

      // データが一つしかない場合、または全て同じ値の場合はその値を表示
      if (data.length === 1 || min === max) {
        const value = min;
        const y = margin.top + chartHeight / 2; // 中央に表示

        ctx.fillStyle = "#666";
        ctx.font = "10px Arial";
        ctx.textAlign = "right";
        ctx.fillText(value.toFixed(1), x - 5, y + 3);

        // 目盛り線
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 3, y);
        ctx.lineTo(x + 3, y);
        ctx.stroke();
      } else {
        const step = (max - min) / 4;

        for (let i = 0; i <= 4; i++) {
          const value = min + i * step;
          const y = margin.top + chartHeight - (i / 4) * chartHeight;

          ctx.fillStyle = "#666";
          ctx.font = "10px Arial";
          ctx.textAlign = "right";
          ctx.fillText(value.toFixed(1), x - 5, y + 3);

          // 目盛り線
          ctx.strokeStyle = "#ddd";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.stroke();
        }
      }
    });

    // データラインを描画
    normalizedData.forEach((item) => {
      const isTarget = item.gamepk === highlightData;
      ctx.strokeStyle = isTarget
        ? "rgba(255, 0, 0, 1)"
        : "rgba(70, 130, 180, 0.3)";
      ctx.lineWidth = isTarget ? 2.5 : 1;
      ctx.beginPath();

      features.forEach((feature, featureIndex) => {
        const x = margin.left + featureIndex * axisSpacing;
        const normalizedValue = item[feature.key + "_normalized"];
        const y = margin.top + chartHeight - normalizedValue * chartHeight;

        if (featureIndex === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    });

    // ホバー効果のためのイベントリスナー
    const handleMouseMove = (event) => {
      // データが空の場合は何もしない
      if (!data.length || !normalizedData.length) return;

      const rect = canvas.getBoundingClientRect();
      // キャンバスの実際の表示サイズと内部サイズの比率を計算
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const mouseX = (event.clientX - rect.left) * scaleX;
      const mouseY = (event.clientY - rect.top) * scaleY;

      // マウス位置に近いデータポイントをハイライト
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 軸を再描画
      features.forEach((feature, index) => {
        const x = margin.left + index * axisSpacing;

        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, margin.top + chartHeight);
        ctx.stroke();

        ctx.fillStyle = "#333";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(feature.label, x, margin.top - 10);

        const values = data.map((d) => d[feature.key]);
        const min = Math.min(...values);
        const max = Math.max(...values);

        // データが一つしかない場合、または全て同じ値の場合はその値を表示
        if (data.length === 1 || min === max) {
          const value = min;
          const y = margin.top + chartHeight / 2; // 中央に表示

          ctx.fillStyle = "#666";
          ctx.font = "10px Arial";
          ctx.textAlign = "right";
          ctx.fillText(value.toFixed(1), x - 5, y + 3);

          ctx.strokeStyle = "#ddd";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - 3, y);
          ctx.lineTo(x + 3, y);
          ctx.stroke();
        } else {
          const step = (max - min) / 4;

          for (let i = 0; i <= 4; i++) {
            const value = min + i * step;
            const y = margin.top + chartHeight - (i / 4) * chartHeight;

            ctx.fillStyle = "#666";
            ctx.font = "10px Arial";
            ctx.textAlign = "right";
            ctx.fillText(value.toFixed(1), x - 5, y + 3);

            ctx.strokeStyle = "#ddd";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x + 3, y);
            ctx.stroke();
          }
        }
      });

      // データラインを再描画
      normalizedData.forEach((item) => {
        let isNearMouse = false;

        for (let i = 0; i < features.length - 1; i++) {
          const x1 = margin.left + i * axisSpacing;
          const x2 = margin.left + (i + 1) * axisSpacing;

          const y1 =
            margin.top +
            chartHeight -
            item[features[i].key + "_normalized"] * chartHeight;
          const y2 =
            margin.top +
            chartHeight -
            item[features[i + 1].key + "_normalized"] * chartHeight;

          const dist = getDistanceToLineSegment(x1, y1, x2, y2, mouseX, mouseY);
          if (dist < 2) {
            // dist < 2 は任意の判定範囲、デカかったら小さくできる
            isNearMouse = true;
            break;
          }
        }
        const isTarget = item.gamepk === highlightData;
        ctx.strokeStyle = isTarget
          ? "rgba(255, 0, 0, 1)"
          : isNearMouse
            ? "rgba(0, 200, 0, 0.8)"
            : "rgba(70, 130, 180, 0.3)";
        ctx.lineWidth = isTarget ? 3 : isNearMouse ? 2 : 1;
        ctx.beginPath();

        features.forEach((feature, featureIndex) => {
          const x = margin.left + featureIndex * axisSpacing;
          const normalizedValue = item[feature.key + "_normalized"];
          const y = margin.top + chartHeight - normalizedValue * chartHeight;

          if (featureIndex === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });

        ctx.stroke();
      });
    };
    // クリック時の挙動管理
    const handleClick = (event) => {
      // データが空の場合は何もしない
      if (!data.length || !normalizedData.length) return;

      const rect = canvas.getBoundingClientRect();
      // キャンバスの実際の表示サイズと内部サイズの比率を計算
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const mouseX = (event.clientX - rect.left) * scaleX;
      const mouseY = (event.clientY - rect.top) * scaleY;

      for (const item of normalizedData) {
        for (let i = 0; i < features.length - 1; i++) {
          const x1 = margin.left + i * axisSpacing;
          const x2 = margin.left + (i + 1) * axisSpacing;

          const y1 =
            margin.top +
            chartHeight -
            item[features[i].key + "_normalized"] * chartHeight;
          const y2 =
            margin.top +
            chartHeight -
            item[features[i + 1].key + "_normalized"] * chartHeight;

          const dist = getDistanceToLineSegment(x1, y1, x2, y2, mouseX, mouseY);

          if (dist < 5) {
            // dist < 5 は任意の判定範囲、デカかったら小さくできる
            console.log("Clicked gamepk:", item.gamepk);
            setHighlightData(item.gamepk);
            dispatch(setGamePk(item.gamepk));
            // クリックされたgamepkを親コンポーネントに通知
            return;
          }
        }
      }
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [data, dimensions, dispatch, highlightData]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          backgroundColor: "#fff",
          maxWidth: "100%",
          maxHeight: "100%",
          width: dimensions.width,
          height: dimensions.height,
          display: "block", // インライン要素の余白を削除
        }}
      />
    </div>
  );
};

export default ParallelCoordinatesItem;
