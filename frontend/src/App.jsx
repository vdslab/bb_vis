import "./App.css";
import "./styles/global.css";
import "./styles/layout.css";
import { useState } from "react";
import Header from "./components/common/Header";
import TestHeader from "./components/common/DevHeader";
import SideBar from "./components/common/SideBar";
import Layout from "./components/layout/Layout";

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="app-container">
      {/* サイドバー */}
      <SideBar onToggle={handleSidebarToggle} isOpen={sidebarExpanded} />

      {/* 本番用ヘッダー */}
      <Header />
      {/* 開発用ヘッダー */}
      {/*<TestHeader /> */}

      <main
        className={`main-container ${sidebarExpanded ? "main-with-sidebar" : "main-without-sidebar"}`}
      >
        <Layout />
      </main>
    </div>
  );
}

export default App;
