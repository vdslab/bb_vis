import "./App.css";
import "./styles/global.css";
import "./styles/layout.css";
import { useState, useEffect } from "react";
import Header from "./components/common/Header";
import SideBar from "./components/common/SideBar";
import Layout from "./components/layout/Layout";
import { useDispatch } from "react-redux";
// devonly:start
import DebugDialog from "./components/organisms/dialog/DebugDialog";
import { useSelector } from "react-redux";
import { setIsDialogOpen } from "@/store/DebugStore";
// devonly:end
import { setGameData, setIsDataLoaded } from "@/store/GameStore";

function App() {
  const dispatch = useDispatch();
  // devonly:start
  const isDialogClose = () => {
    dispatch(setIsDialogOpen(false));
  };
  const isDialogOpen = useSelector((state) => state.debug.isDialogOpen);
  const isDebugMode = useSelector((state) => state.debug.debugMode);
  // devonly:end

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };

  // データを一度だけ読み込む
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/2025-03-16-2025-10-06.json");
        const jsonData = await response.json();
        dispatch(setGameData(jsonData));
        dispatch(setIsDataLoaded(true));
      } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
        dispatch(setIsDataLoaded(false));
      }
    };
    loadData();
  }, [dispatch]);

  return (
    <div className="app-container">
      <SideBar onToggle={handleSidebarToggle} isOpen={sidebarExpanded} />
      <Header />
      <main
        className={`main-container ${sidebarExpanded ? "main-with-sidebar" : "main-without-sidebar"}`}
      >
        <Layout />
      </main>
      {/* devonly:start */}
      <style>
        {`
          @keyframes debugFade {
            0% {
              opacity: 0.8;
            }
            100% {
              opacity: 1;
              0 0 30px rgba(255, 255, 0, 0.6),
              0 0 40px rgba(255, 255, 0, 0.3);
            }
          }
        `}
      </style>
      {isDebugMode && (
        <>
          <span
            className="debug-mode-rect"
            style={{
              position: "absolute",
              left: "0px",
              bottom: "0px",
              width: "143px",
              height: "23px",
              backgroundColor: "black",
              opacity: 1,
              zIndex: 9999,
              animation: "debugFade 1.5s ease-in-out infinite alternate",
            }}
          ></span>
          <span
            className="debug-mode-label"
            style={{
              position: "absolute",
              left: "0px",
              bottom: "0px",
              color: "yellow",
              fontWeight: "bold",
              opacity: 1,
              fontSize: "18px",
              letterSpacing: "2px",
              zIndex: 9999,
              fontStyle: "italic",
            }}
          >
            DEBUG MODE
          </span>
        </>
      )}
      <DebugDialog isOpen={isDialogOpen} handleClose={isDialogClose} />
      {/* devonly:end */}
    </div>
  );
}

export default App;
