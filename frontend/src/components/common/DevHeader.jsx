import { useMovieData } from "@/hooks/useMovieData";

const Header = () => {
  const { loading, handleGetDetailById } = useMovieData();

  return (
    <header className="header">
      <h1>BB Vis Dev</h1>
      <button onClick={handleGetDetailById} disabled={loading}>
        {loading ? "Loading..." : "データ取得"}
      </button>
      <nav>
        <span>ナビゲーション</span>
      </nav>
    </header>
  );
};

export default Header;
