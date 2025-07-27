import { useState, useEffect } from "react";
import "./SideBar.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const SideBar = ({ onToggle, isOpen }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // 外部からisOpenプロパティが渡された場合、それに合わせて状態を更新
  useEffect(() => {
    if (isOpen !== undefined) {
      setIsExpanded(isOpen);
    }
  }, [isOpen]);

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div
      className={`sidebar ${isExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}
    >
      <div className="sidebar-toolbar">
        <button
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label={isExpanded ? "サイドバーを閉じる" : "サイドバーを開く"}
        >
          <FilterAltIcon />
        </button>
      </div>
      <div className="sidebar-divider"></div>
      <div className="sidebar-content">{/* 後々コンテンツを追加予定 */}</div>
    </div>
  );
};

export default SideBar;
