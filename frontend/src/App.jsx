import "./App.css";
import "./styles/global.css";
import "./styles/layout.css";
import { useState } from "react";
import Header from "./components/common/Header";
import TestHeader from "./components/common/DevHeader";
import SideBar from "./components/common/SideBar";
import Layout from "./components/layout/Layout";
// devonly:start
import DebugDialog from "./components/organisms/dialog/DebugDialog";
import { useDispatch, useSelector } from "react-redux";
import { setIsDialogOpen } from "@/store/DebugStore";
// devonly:end

function App() {
  // devonly:start
  const dispatch = useDispatch();
  const isDialogClose = () => {
    dispatch(setIsDialogOpen(false));
  };
  const isDialogOpen = useSelector((state) => state.debug.isDialogOpen);
  // devonly:end

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
      {/* devonly:start */}
      <DebugDialog isOpen={isDialogOpen} handleClose={isDialogClose} />
      {/* devonly:end */}
    </div>
  );
}

export default App;
