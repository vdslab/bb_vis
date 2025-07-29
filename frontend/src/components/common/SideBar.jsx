import { useState, useEffect } from "react";
import "./SideBar.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Search from "../panels/Search";

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
      <div className="sidebar-content">
        {isExpanded && <Search />}
      </div>
    </div>
  );
};

export default SideBar;
