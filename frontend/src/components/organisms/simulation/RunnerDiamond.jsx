import React from "react";
import "@/styles/simulation.css";

// ランナー状況を示すミニダイアモンド
const RunnerDiamond = ({ runnerState }) => {
  // ランナーがいるかどうかをfull_nameで判定
  const hasFirst =
    runnerState?.["1B"]?.full_name !== null && runnerState?.["1B"]?.full_name !== undefined;
  const hasSecond =
    runnerState?.["2B"]?.full_name !== null && runnerState?.["2B"]?.full_name !== undefined;
  const hasThird =
    runnerState?.["3B"]?.full_name !== null && runnerState?.["3B"]?.full_name !== undefined;

  return (
    <svg className="runner-diamond" width="28" height="28" viewBox="0 0 28 28">
      {/* ダイアモンドの外枠 */}
      <path d="M 14 2 L 26 14 L 14 26 L 2 14 Z" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      {/* 2塁（上） */}
      <path
        d="M 14 2 L 17 5 L 14 8 L 11 5 Z"
        fill={hasSecond ? "#ef4444" : "none"}
        stroke="#9ca3af"
        strokeWidth="1"
      />
      {/* 1塁（右） */}
      <path
        d="M 26 14 L 23 11 L 20 14 L 23 17 Z"
        fill={hasFirst ? "#ef4444" : "none"}
        stroke="#9ca3af"
        strokeWidth="1"
      />
      {/* 3塁（左） */}
      <path
        d="M 2 14 L 5 11 L 8 14 L 5 17 Z"
        fill={hasThird ? "#ef4444" : "none"}
        stroke="#9ca3af"
        strokeWidth="1"
      />
      {/* ホームベース（下・五角形） */}
      <path
        d="M 14 26 L 11 23 L 11 20 L 17 20 L 17 23 Z"
        fill="#9ca3af"
        stroke="#9ca3af"
        strokeWidth="1"
      />
    </svg>
  );
};

export default RunnerDiamond;
