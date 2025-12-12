import { ResponsiveHeatMap } from "@nivo/heatmap";
import { setId } from "@/store/GameStore";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import InningOverlay from "./InningOverlay";

const HeatMapItem = ({ analysisData, onHover, onLeave, currentPId, currentEId }) => {
  const dispatch = useDispatch();
  const [currentCellPosition, setCurrentCellPosition] = useState(null);

  useEffect(() => {
    if (analysisData && analysisData.length > 0) {
      const firstRow = analysisData[0];
      if (firstRow && firstRow.data && firstRow.data.length > 0) {
        const firstData = firstRow.data[0];
        if (firstData.p_id !== undefined && firstData.e_id !== undefined) {
          dispatch(
            setId({
              p_id: Number(firstData.p_id),
              e_id: Number(firstData.e_id),
            }),
          );
        }
      }
    }
  }, [analysisData, dispatch]);

  // 現在のセルの位置を計算
  useEffect(() => {
    if (analysisData && currentPId !== null && currentEId !== null) {
      // analysisDataから現在のセルを探す
      let rowIndex = -1;
      let colIndex = -1;

      analysisData.forEach((row, rIdx) => {
        if (row.data) {
          row.data.forEach((cell, cIdx) => {
            if (
              Number(cell.p_id) === Number(currentPId) &&
              Number(cell.e_id) === Number(currentEId)
            ) {
              rowIndex = rIdx;
              colIndex = cIdx;
            }
          });
        }
      });

      if (rowIndex !== -1 && colIndex !== -1) {
        // 分析データに存在する場合は位置を更新
        setCurrentCellPosition({ row: rowIndex, col: colIndex });
      }
    }
  }, [analysisData, currentPId, currentEId]);

  const handleRowClick = (row) => {
    dispatch(setId({ p_id: Number(row.data.p_id), e_id: Number(row.data.e_id) }));
  };

  const handleMouseEnter = (cell) => {
    if (onHover && cell && cell.data) {
      const hoverData = {
        p_id: Number(cell.data.p_id),
        e_id: Number(cell.data.e_id),
      };
      onHover(hoverData);
    }
  };

  const handleMouseLeave = () => {
    if (onLeave) {
      onLeave();
    }
  };

  return (
    <div className="heatmap-wrapper">
      {/* イニング情報のオーバーレイ */}
      <InningOverlay analysisData={analysisData} />

      {/* 現在のセルマーカー */}
      {currentCellPosition && (
        <div
          className="current-cell-marker"
          style={{
            position: "absolute",
            top: `calc(50px + ${currentCellPosition.row} * (100% - 51px) / ${analysisData.length})`,
            left: `calc(13px + ${currentCellPosition.col} * (100% - 13px) / ${analysisData[0]?.data?.length || 1})`,
            width: `calc((100% - 13px) / ${analysisData[0]?.data?.length || 1})`,
            height: `calc((100% - 51px) / ${analysisData.length})`,
            border: "3px solid #ff6b6b",
            boxShadow: "0 0 15px rgba(255, 107, 107, 0.8), inset 0 0 15px rgba(255, 107, 107, 0.3)",
            pointerEvents: "none",
            zIndex: 10,
            animation: "pulse-marker 2s ease-in-out infinite",
          }}
        />
      )}

      {/* カスタム凡例オーバーレイ - 縦表示 */}
      <div className="heatmap-legend-overlay">
        <div className="heatmap-legend-title"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2px",
            height: "100%",
          }}
        >
          <div className="heatmap-legend-gradient"></div>
          <div className="heatmap-legend-labels">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* ヒートマップ */}
      <ResponsiveHeatMap
        data={analysisData}
        margin={{ top: 50, right: 0, bottom: 1, left: 15 }}
        valueFormat=">-.2s"
        axisTop={null}
        axisLeft={null}
        colors={{
          type: "quantize",
          scheme: "blues",
          steps: 10,
          minValue: 0,
          maxValue: 100,
        }}
        emptyColor="#555555"
        borderWidth={0.1}
        borderColor="#000000"
        enableLabels={false}
        onClick={handleRowClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // tooltip={CustomTooltip}
        tooltip={() => <></>}
      />
    </div>
  );
};

export default HeatMapItem;
