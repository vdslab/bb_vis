import "./App.css";
import "./styles/global.css";
import "./styles/layout.css";
import Header from "./components/common/Header";
import TestHeader from "./components/common/DevHeader";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="app-container">
      {/* 本番用ヘッダー */}
      <Header />
      {/* 開発用ヘッダー */}
      {/*<TestHeader /> */}

      <main className="main-container">
        <Layout />
      </main>
    </div>
  );
}

export default App;
