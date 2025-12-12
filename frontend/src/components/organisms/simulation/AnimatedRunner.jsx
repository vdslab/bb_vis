import { useState, useEffect } from "react";
import "@/styles/simulation.css";

/**
 * アニメーション中のランナーコンポーネント
 * ベース間を滑らかに移動するアニメーションを表示
 */
const AnimatedRunner = ({ name, path, basePositions, runnerImg, startTime, isScoring }) => {
  // 初期位置を開始ベースの位置に設定
  const initialPosition = basePositions[path[0]] || { top: 0, left: 0 };
  const [position, setPosition] = useState(initialPosition);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const stepDuration = 400; // 各ステップの時間（ms）
    let animationFrame;

    const animate = () => {
      const elapsed = Date.now() - startTime;

      // アニメーション開始前は開始位置を表示
      if (elapsed < 0) {
        setPosition(basePositions[path[0]]);
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const totalDuration = path.length * stepDuration;

      if (elapsed >= totalDuration) {
        // アニメーション終了
        const finalBase = path[path.length - 1];
        setPosition(basePositions[finalBase]);

        // 得点した場合は非表示にする
        if (isScoring && finalBase === "home") {
          setIsVisible(false);
        }
        return;
      }

      // 現在のステップを計算
      const currentStep = Math.floor(elapsed / stepDuration);
      const stepProgress = (elapsed % stepDuration) / stepDuration;

      if (currentStep >= path.length - 1) {
        // 最後のステップ
        const finalBase = path[path.length - 1];
        setPosition(basePositions[finalBase]);
      } else {
        // 現在のベースから次のベースへの補間
        const fromBase = path[currentStep];
        const toBase = path[currentStep + 1];
        const fromPos = basePositions[fromBase];
        const toPos = basePositions[toBase];

        // イージング関数（ease-in-out）
        const eased =
          stepProgress < 0.5
            ? 2 * stepProgress * stepProgress
            : 1 - Math.pow(-2 * stepProgress + 2, 2) / 2;

        setPosition({
          top: fromPos.top + (toPos.top - fromPos.top) * eased,
          left: fromPos.left + (toPos.left - fromPos.left) * eased,
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [path, basePositions, startTime, isScoring]);

  if (!isVisible) return null;

  return (
    <div
      className="runner runner-animating"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
      }}
    >
      <span className="runner-name">{name}</span>
      <div className="runner-img-wrapper">
        <img src={runnerImg} alt="ランナー" className="runner-img" />
      </div>
    </div>
  );
};

export default AnimatedRunner;
