// fillteredDataを参照するとフィルタ済みデータが取得できるようになっています
// もし必要になったら参照してください。
// データの形としてはgamepkと各軸の値が入っています。

import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setGamePk,
  setSelectedGameDate,
  setSelectedGameAwayTeam,
  setSelectedGameHomeTeam,
  setFilteredGamePks,
  setBrushFilteredGamePks,
  setHighlightData,
  setHighlightFromParallelCoordinates,
} from "../../../store/GameStore";
import { useSelector } from "react-redux";

const ParallelCoordinatesItem = ({ brushDeleteFlag }) => {
  const dispatch = useDispatch();
  const filteredGamePks = useSelector((state) => state.game.filteredGamePks);
  const highlightData = useSelector((state) => state.game.highlightData);
  const gameData = useSelector((state) => state.game.gameData);
  const isDataLoaded = useSelector((state) => state.game.isDataLoaded);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [data, setData] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // ブラシ状態管理
  const [brushes, setBrushes] = useState({});
  const [activeBrush, setActiveBrush] = useState(null);
  const [isBrushing, setIsBrushing] = useState(false);

  // ブラシでフィルタされたデータの格納
  // TODO:使ってないとエラーになるからコメントアウトしといた
  // const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setBrushes({});
    // ブラシクリア時は、brushFilteredGamePksもnullにリセット
    dispatch(setBrushFilteredGamePks(null));
  }, [brushDeleteFlag, dispatch]);

  // コンテナサイズ監視
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateCanvasSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  // データ読み込み（filteredGamePksから取得）
  useEffect(() => {
    if (!isDataLoaded || gameData.length === 0) {
      return;
    }

    // filteredGamePksに含まれるデータだけを取得し、順序を維持
    const filteredData = filteredGamePks
      .map((gamepk) => gameData.find((item) => item.gamepk === gamepk))
      .filter((item) => item !== undefined);

    setData(filteredData);
  }, [gameData, isDataLoaded, filteredGamePks]);

  // ブラシフィルターの適用（brushesが変更された時のみ）
  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    // ブラシが何も設定されていない場合
    const hasBrushes = Object.values(brushes).some((range) => range && range.y1 !== range.y2);

    if (!hasBrushes) {
      // ブラシがない場合はnullをセット（filteredGamePksを使う）
      dispatch(setBrushFilteredGamePks(null));
      return;
    }

    // 各特徴量を正規化
    const features = [
      { key: "time", label: "試合時間（秒）", color: "#FF6B6B" },
      { key: "ex_base_hit_cnt", label: "長打数", color: "#4ECDC4" },
      { key: "total_score", label: "総得点数", color: "#45B7D1" },
      { key: "diff_score", label: "得点差", color: "#96CEB4" },
      { key: "lead_change_cnt", label: "逆転回数", color: "#FFEAA7" },
    ];

    let normalizedData = [...data];
    features.forEach((feature) => {
      normalizedData = normalizeData(normalizedData, feature.key);
    });

    // キャンバスのサイズ情報を取得
    const margin = { top: 40, bottom: 40, left: 60, right: 60 };
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    // ブラシフィルタで絞り込み
    const brushFiltered = normalizedData.filter((item) => {
      return Object.entries(brushes).every(([key, range]) => {
        if (!range || range.y1 === range.y2) return true;
        const y = margin.top + chartHeight - item[key + "_normalized"] * chartHeight;
        const minY = Math.min(range.y1, range.y2);
        const maxY = Math.max(range.y1, range.y2);
        return y >= minY && y <= maxY;
      });
    });

    // ブラシフィルター結果をReduxストアに保存
    dispatch(setBrushFilteredGamePks(brushFiltered.map((item) => item.gamepk)));
  }, [brushes, data, dimensions, dispatch]);

  // データ正規化（0〜1に変換）
  const normalizeData = (data, key) => {
    if (!data || data.length === 0) {
      return [];
    }

    const values = data.map((d) => d[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // データが一つ、または全て同じ値の場合は中央(0.5)に固定
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

  // 2点間の距離計算（線分への距離）
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

  // メイン描画＆イベント処理
  useEffect(() => {
    if (!data.length || !canvasRef.current || dimensions.width === 0 || dimensions.height === 0) {
      // データなしのキャンバス表示
      const canvas = canvasRef.current;
      if (canvas && dimensions.width > 0 && dimensions.height > 0) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        ctx.fillStyle = "#666";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";

        ctx.fillText("No Data", dimensions.width / 2, dimensions.height / 2);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // 特徴量一覧（日本語）
    const features = [
      { key: "time", label: "試合時間（秒）", color: "#FF6B6B" },
      { key: "ex_base_hit_cnt", label: "長打数", color: "#4ECDC4" },
      { key: "total_score", label: "総得点数", color: "#45B7D1" },
      { key: "diff_score", label: "得点差", color: "#96CEB4" },
      { key: "lead_change_cnt", label: "逆転回数", color: "#FFEAA7" },
    ];

    // 正規化
    let normalizedData = [...data];
    features.forEach((feature) => {
      normalizedData = normalizeData(normalizedData, feature.key);
    });

    // マージンとチャート領域計算
    const margin = { top: 40, bottom: 40, left: 60, right: 60 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;
    const axisSpacing = chartWidth / (features.length - 1);

    // 軸描画
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

      // 目盛り表示
      const values = data.map((d) => d[feature.key]);
      const min = Math.min(...values);
      const max = Math.max(...values);

      if (data.length === 1 || min === max) {
        const value = min;
        const y = margin.top + chartHeight / 2;

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

    // ブラシフィルタで絞り込み（描画用）
    // NOTE: ブラシフィルターの結果は別のuseEffectでbrusFilteredGamePksに保存される
    const filteredData = normalizedData.filter((item) => {
      return Object.entries(brushes).every(([key, range]) => {
        if (!range || range.y1 === range.y2) return true; // ブラシ未適用軸はスルー
        const y = margin.top + chartHeight - item[key + "_normalized"] * chartHeight;
        const minY = Math.min(range.y1, range.y2);
        const maxY = Math.max(range.y1, range.y2);
        return y >= minY && y <= maxY;
      });
    });

    // データライン描画（ブラシフィルタ済み）
    filteredData.forEach((item) => {
      const isTarget = item.gamepk === highlightData;
      ctx.strokeStyle = isTarget ? "rgba(249, 115, 22, 1)" : "rgba(148, 163, 184, 0.3)";
      ctx.lineWidth = isTarget ? 3 : 1;
      ctx.beginPath();

      features.forEach((feature, i) => {
        const x = margin.left + i * axisSpacing;
        const normalizedValue = item[feature.key + "_normalized"];
        const y = margin.top + chartHeight - normalizedValue * chartHeight;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });

      ctx.stroke();
    });

    // ブラシの矩形を描画
    Object.entries(brushes).forEach(([key, { y1, y2 }]) => {
      if (!y1 || !y2 || y1 === y2) return;
      const idx = features.findIndex((f) => f.key === key);
      if (idx === -1) return;
      const x = margin.left + idx * axisSpacing;
      ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
      ctx.fillRect(x - 5, Math.min(y1, y2), 10, Math.abs(y2 - y1));
    });

    // マウス位置の取得および軸付近判定関数
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // マウスX座標が軸付近か判定（距離10px以内）
    const isNearAxis = (mouseX) => {
      for (let i = 0; i < features.length; i++) {
        const axisX = margin.left + i * axisSpacing;
        if (Math.abs(mouseX - axisX) < 10) return features[i].key;
      }
      return null;
    };

    // マウス移動時イベント処理
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      // 軸付近またはブラシ中はカーソルを縦矢印に
      const nearAxisKey = isNearAxis(mouseX);
      if (isBrushing || nearAxisKey) {
        canvas.style.cursor = "ns-resize";
        return;
      } else {
        canvas.style.cursor = "default";
      }

      // 【重要】軸付近またはブラシ中はホバー・クリック無効化
      if (isBrushing || nearAxisKey) return;

      // キャンバスクリア
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 軸を再描画（省略は不可）
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

        if (data.length === 1 || min === max) {
          const value = min;
          const y = margin.top + chartHeight / 2;

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

      // ホバー効果（フィルタ済みデータ上でマウスに近いラインを色付け）
      filteredData.forEach((item) => {
        let isNearMouse = false;

        for (let i = 0; i < features.length - 1; i++) {
          const x1 = margin.left + i * axisSpacing;
          const x2 = margin.left + (i + 1) * axisSpacing;

          const y1 = margin.top + chartHeight - item[features[i].key + "_normalized"] * chartHeight;
          const y2 =
            margin.top + chartHeight - item[features[i + 1].key + "_normalized"] * chartHeight;

          const dist = getDistanceToLineSegment(x1, y1, x2, y2, mouseX, mouseY);

          if (dist < 2) {
            isNearMouse = true;
            break;
          }
        }

        const isTarget = item.gamepk === highlightData;
        ctx.strokeStyle = isTarget
          ? "rgba(249, 115, 22, 1)"
          : isNearMouse
            ? "rgba(14, 165, 233, 0.9)"
            : "rgba(148, 163, 184, 0.3)";
        ctx.lineWidth = isTarget ? 3.5 : isNearMouse ? 2.5 : 1;

        ctx.beginPath();
        features.forEach((feature, featureIndex) => {
          const x = margin.left + featureIndex * axisSpacing;
          const normalizedValue = item[feature.key + "_normalized"];
          const y = margin.top + chartHeight - normalizedValue * chartHeight;

          featureIndex === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
      });

      // ブラシ矩形の再描画
      Object.entries(brushes).forEach(([key, { y1, y2 }]) => {
        if (!y1 || !y2 || y1 === y2) return;
        const idx = features.findIndex((f) => f.key === key);
        if (idx === -1) return;
        const x = margin.left + idx * axisSpacing;
        ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
        ctx.fillRect(x - 5, Math.min(y1, y2), 10, Math.abs(y2 - y1));
      });
    };

    // クリックイベント処理
    const handleClick = (e) => {
      // 軸付近またはブラシ中はクリック無効化
      const mouseX = (e.clientX - rect.left) * scaleX;
      const nearAxisKey = isNearAxis(mouseX);
      if (isBrushing || nearAxisKey) return;

      const mouseY = (e.clientY - rect.top) * scaleY;

      for (const item of filteredData) {
        for (let i = 0; i < features.length - 1; i++) {
          const x1 = margin.left + i * axisSpacing;
          const x2 = margin.left + (i + 1) * axisSpacing;

          const y1 = margin.top + chartHeight - item[features[i].key + "_normalized"] * chartHeight;
          const y2 =
            margin.top + chartHeight - item[features[i + 1].key + "_normalized"] * chartHeight;

          const dist = getDistanceToLineSegment(x1, y1, x2, y2, mouseX, mouseY);

          if (dist < 5) {
            dispatch(setHighlightData(item.gamepk));
            dispatch(setHighlightFromParallelCoordinates(true)); // パラレルコーディネートからの選択
            dispatch(setGamePk(item.gamepk));
            dispatch(setSelectedGameDate(item.date));
            dispatch(setSelectedGameAwayTeam(item.team.away));
            dispatch(setSelectedGameHomeTeam(item.team.home));
            return;
          }
        }
      }
    };

    // ブラシ開始（mousedown）
    const handleMouseDown = (e) => {
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;
      const nearAxisKey = isNearAxis(mouseX);
      if (!nearAxisKey) return;

      setActiveBrush(nearAxisKey);
      setIsBrushing(true);

      setBrushes((prev) => ({
        ...prev,
        [nearAxisKey]: { y1: mouseY, y2: mouseY },
      }));

      canvas.style.cursor = "ns-resize";
    };

    // ブラシ移動（mousemove during brushing）
    const handleMouseMoveBrush = (e) => {
      if (!isBrushing || !activeBrush) return;

      const mouseY = (e.clientY - rect.top) * scaleY;

      setBrushes((prev) => {
        const prevRange = prev[activeBrush];
        if (!prevRange) return prev;
        return {
          ...prev,
          [activeBrush]: {
            y1: prevRange.y1,
            y2: mouseY,
          },
        };
      });
    };

    // ブラシ終了（mouseup）
    const handleMouseUpBrush = () => {
      if (!isBrushing) return;

      setBrushes((prev) => {
        const newBrushes = { ...prev };
        if (activeBrush && newBrushes[activeBrush]) {
          const { y1, y2 } = newBrushes[activeBrush];
          // 範囲がほぼゼロならブラシを解除
          if (Math.abs(y1 - y2) < 3) {
            delete newBrushes[activeBrush];
          }
        }
        return newBrushes;
      });

      setIsBrushing(false);
      setActiveBrush(null);
      canvas.style.cursor = "default";
    };

    // イベントリスナー登録
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMoveBrush);
    window.addEventListener("mouseup", handleMouseUpBrush);

    // 初期描画（マウス位置情報がなくても良いので仮値で呼び出し）
    handleMouseMove({ clientX: rect.left, clientY: rect.top });

    // クリーンアップ
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMoveBrush);
      window.removeEventListener("mouseup", handleMouseUpBrush);
    };
  }, [data, dimensions, brushes, isBrushing, activeBrush, highlightData, dispatch]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          cursor: isBrushing ? "ns-resize" : "default",
          userSelect: "none",
        }}
      />
    </div>
  );
};

export default ParallelCoordinatesItem;
