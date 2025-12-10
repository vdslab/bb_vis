import "@/styles/simulation.css";

/**
 * 静的なランナー表示コンポーネント
 */
const StaticRunner = ({ name, base, runnerImg }) => {
  if (!name) return null;

  return (
    <div className={`runner ${base}-base`}>
      <span className="runner-name">{name}</span>
      <div className="runner-img-wrapper">
        <img src={runnerImg} alt="ランナー" className="runner-img" />
      </div>
    </div>
  );
};

export default StaticRunner;
