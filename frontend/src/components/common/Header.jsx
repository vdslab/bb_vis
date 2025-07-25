import rogoImg from "../../asset/rogo.png";

const Header = () => {
  return (
    <header className="header">
      <h1>
        <img
          src={rogoImg}
          alt="ロゴ"
          style={{
            width: "30%",
            height: "60%",
            position: "relative",
            bottom: "-10px",
          }}
        />
      </h1>
      <nav>
        <span>ナビゲーション</span>
      </nav>
    </header>
  );
};

export default Header;
