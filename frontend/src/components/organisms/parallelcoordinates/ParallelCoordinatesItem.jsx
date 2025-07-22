import React, { useRef, useEffect, useState } from "react";

const ParallelCoordinatesItem = () => {
  const canvasRef = useRef(null);
  const [data, setData] = useState([]);
  const [dimensions] = useState({
    width: 800,
    height: 400,
  });

  // データを読み込む
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/2025-03-16-2025-07-14.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
      }
    };
    loadData();
  }, []);

  // データの正規化
  const normalizeData = (data, key) => {
    const values = data.map((d) => d[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return data.map((d) => ({
      ...d,
      [key + "_normalized"]: (d[key] - min) / (max - min),
    }));
  };

  const getGamepk = (data) => {
    return data.map((item, key) => ({
      key: key,
      gamepk: item.gamepk,
    }));
  };
  // ハイライト用データ、テスト用
  const highlightData = 778122;

  // パラレルコーディネートを描画
  useEffect(() => {
    if (!data.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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

    // gamepkを取得
    // let gamepk = getGamepk(data);

    // console.log("gamepk", gamepk);

    // マウスホバー時のデータ格納用
    // 将来的にはマウスホバー、クリック、該当gamepkのビデオクリップかなんかに使ってください
    // 今はテスト用にハイライトデータを設定中

    // const [hoveredData, setHoveredData] = useState(null);
    // const hoveredGamepk = hoveredData ? hoveredData.gamepk : null;

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
    });

    // データラインを描画
    normalizedData.forEach((item) => {
      console.log(item.gamepk);
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
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

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
      });

      // データラインを再描画
      normalizedData.forEach((item) => {
        const isNearMouse = features.some((feature, featureIndex) => {
          const x = margin.left + featureIndex * axisSpacing;
          const normalizedValue = item[feature.key + "_normalized"];
          const y = margin.top + chartHeight - normalizedValue * chartHeight;

          const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
          return distance < 10;
        });
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

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [data, dimensions]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{
            backgroundColor: "#fff",
          }}
        />
      </div>
    </div>
  );
};

export default ParallelCoordinatesItem;
