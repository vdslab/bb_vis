import { useState, useEffect } from "react";
import {
  calculateBasePath,
  calculateBasePathFromHome,
  calculateBasePathToHome,
} from "@/util/basePathUtils";

/**
 * ランナーアニメーションを管理するカスタムフック
 * 元のGameField.jsxのアニメーションロジックをそのまま保持
 */
export const useRunnerAnimation = (eventData) => {
  const [runners, setRunners] = useState({
    first: { name: null },
    second: { name: null },
    third: { name: null },
  });

  // 前回のランナー状態を保持
  const [prevRunners, setPrevRunners] = useState({
    first: { name: null },
    second: { name: null },
    third: { name: null },
  });

  // アニメーション中のランナーを管理（配列で複数ステップ対応）
  const [animatingRunners, setAnimatingRunners] = useState([]);

  useEffect(() => {
    if (eventData) {
      // 新しいランナー状態を取得
      const runnerState = eventData.runner_state.pos_runner_state;
      const newRunners = {
        first: { name: runnerState["1B"]?.full_name || null },
        second: { name: runnerState["2B"]?.full_name || null },
        third: { name: runnerState["3B"]?.full_name || null },
      };

      // 得点があったかどうか
      const hasScored = eventData.score_from_event && eventData.score_from_event > 0;

      // 打者の情報
      const batterName = eventData.batter?.full_name || null;

      // イニング交代チェック：ランナーが全員消えた場合
      const hadRunners =
        prevRunners.first.name || prevRunners.second.name || prevRunners.third.name;
      const hasNewRunners =
        newRunners.first.name || newRunners.second.name || newRunners.third.name;
      const isInningChange = hadRunners && !hasNewRunners && !hasScored;

      // イニング交代の場合は、アニメーションせずに即座に更新
      if (isInningChange) {
        setAnimatingRunners([]);
        setPrevRunners(newRunners);
        setRunners(newRunners);
        return;
      }

      // ランナーの移動を検出してアニメーション
      const newAnimatingRunners = [];
      const animStartTime = Date.now(); // 全ランナーが同時に開始

      // 全てのランナー名を収集
      const allRunnerNames = new Set(
        [
          prevRunners.first.name,
          prevRunners.second.name,
          prevRunners.third.name,
          newRunners.first.name,
          newRunners.second.name,
          newRunners.third.name,
        ].filter(Boolean),
      );

      // 得点したランナーを先に処理（ホームへのアニメーション）
      // ただし、実際に得点があった場合のみ
      const scoredRunners = [];
      if (hasScored) {
        [prevRunners.first.name, prevRunners.second.name, prevRunners.third.name]
          .filter(Boolean)
          .forEach((runnerName) => {
            // 前回いたが今回いない = 得点の可能性
            const isInNew =
              newRunners.first.name === runnerName ||
              newRunners.second.name === runnerName ||
              newRunners.third.name === runnerName;

            if (!isInNew) {
              // 得点と判定
              let fromBase = null;
              if (prevRunners.first.name === runnerName) fromBase = "first";
              else if (prevRunners.second.name === runnerName) fromBase = "second";
              else if (prevRunners.third.name === runnerName) fromBase = "third";

              if (fromBase) {
                const path = calculateBasePathToHome(fromBase);
                scoredRunners.push({
                  name: runnerName,
                  path: path,
                  startTime: animStartTime,
                  isScoring: true,
                });
              }
            }
          });
      }

      newAnimatingRunners.push(...scoredRunners);

      // 既存ランナーの移動を処理
      allRunnerNames.forEach((runnerName) => {
        // 得点したランナーはスキップ
        if (scoredRunners.find((r) => r.name === runnerName)) return;

        // 前回の位置を探す
        let fromBase = null;
        if (prevRunners.first.name === runnerName) fromBase = "first";
        else if (prevRunners.second.name === runnerName) fromBase = "second";
        else if (prevRunners.third.name === runnerName) fromBase = "third";

        // 今回の位置を探す
        let toBase = null;
        if (newRunners.first.name === runnerName) toBase = "first";
        else if (newRunners.second.name === runnerName) toBase = "second";
        else if (newRunners.third.name === runnerName) toBase = "third";

        // 新規出塁（ホームから）
        if (!fromBase && toBase) {
          const path = calculateBasePathFromHome(toBase);
          newAnimatingRunners.push({
            name: runnerName,
            path: path,
            startTime: animStartTime,
            isNew: true,
          });
        }
        // 既存ランナーの移動
        else if (fromBase && toBase && fromBase !== toBase) {
          const path = calculateBasePath(fromBase, toBase);
          newAnimatingRunners.push({
            name: runnerName,
            path: path,
            startTime: animStartTime,
          });
        }
      });

      // バッターがホームランで得点した場合（ホーム一周）
      if (hasScored && batterName) {
        // バッターが新規ランナーとして出塁していない = ホームラン等で得点
        const batterIsOnBase =
          newRunners.first.name === batterName ||
          newRunners.second.name === batterName ||
          newRunners.third.name === batterName;

        // バッターが前回のランナーでもない = 新規出塁からの得点
        const batterWasOnBase =
          prevRunners.first.name === batterName ||
          prevRunners.second.name === batterName ||
          prevRunners.third.name === batterName;

        // 得点したランナーの数を数える
        const runnersScoredCount = scoredRunners.length;

        // ホームランの条件：
        // 1. バッターが塁に残っていない（得点した）
        // 2. バッターは前回塁にいなかった（新規打席）
        // 3. 得点数がいなくなったランナー数より多い（バッター自身も得点）
        //    例: 満塁HR = 4点, いなくなったランナー3人 → バッターも得点
        //    例: 犠牲フライ = 1点, いなくなったランナー1人 → バッターは得点していない
        const isHomeRun =
          !batterIsOnBase && !batterWasOnBase && eventData.score_from_event > runnersScoredCount;

        if (isHomeRun) {
          // ホームラン: home -> 1st -> 2nd -> 3rd -> home
          const homeRunPath = ["home", "first", "second", "third", "home"];
          newAnimatingRunners.push({
            name: batterName,
            path: homeRunPath,
            startTime: animStartTime,
            isScoring: true,
          });
        }
      }

      // 最大アニメーション時間後にクリーンアップ
      if (newAnimatingRunners.length > 0) {
        const maxDuration = Math.max(...newAnimatingRunners.map((r) => r.path.length * 400));
        setTimeout(() => {
          setAnimatingRunners([]);
        }, maxDuration + 100);
      }

      setAnimatingRunners(newAnimatingRunners);
      setPrevRunners(newRunners);
      setRunners(newRunners);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventData]);

  return { runners, animatingRunners };
};
