import StaticRunner from "./StaticRunner";
import AnimatedRunner from "./AnimatedRunner";
import { BASE_POSITIONS } from "@/util/basePathUtils";

/**
 * ランナーの表示を管理するコンポーネント
 * 元のGameField.jsxのランナー表示ロジックをそのまま保持
 */
const RunnersDisplay = ({ runners, animatingRunners, runnerImg }) => {
  return (
    <div className="runners-overlay">
      {/* 通常のランナー（アニメーション中でないもの） */}
      {runners.first.name && !animatingRunners.find((r) => r.name === runners.first.name) && (
        <StaticRunner name={runners.first.name} base="first" runnerImg={runnerImg} />
      )}

      {runners.second.name && !animatingRunners.find((r) => r.name === runners.second.name) && (
        <StaticRunner name={runners.second.name} base="second" runnerImg={runnerImg} />
      )}

      {runners.third.name && !animatingRunners.find((r) => r.name === runners.third.name) && (
        <StaticRunner name={runners.third.name} base="third" runnerImg={runnerImg} />
      )}

      {/* アニメーション中のランナー */}
      {animatingRunners.map((animRunner) => (
        <AnimatedRunner
          key={animRunner.name}
          name={animRunner.name}
          path={animRunner.path}
          basePositions={BASE_POSITIONS}
          runnerImg={runnerImg}
          startTime={animRunner.startTime}
          isScoring={animRunner.isScoring || false}
        />
      ))}
    </div>
  );
};

export default RunnersDisplay;
