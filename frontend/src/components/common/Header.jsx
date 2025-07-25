import rogoImg from "../../asset/rogo.png";

const Header = () => {
  return (
    <header className="header">
      <h1>
        <img src={rogoImg} alt="ロゴ" className="logo-img" />
      </h1>
      <nav>
        <span>ナビゲーション</span>
      </nav>
    </header>
  );
};

export default Header;
