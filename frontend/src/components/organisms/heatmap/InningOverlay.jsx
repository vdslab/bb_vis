import { useMemo } from "react";
import "@/styles/heatmap.css";

const InningOverlay = ({ analysisData }) => {
  // イニング変更のタイミングを検出
  const inningMarkers = useMemo(() => {
    if (!analysisData || analysisData.length === 0) return [];

    const markers = [];
    const firstRow = analysisData[0];

    if (!firstRow || !firstRow.data || firstRow.data.length === 0) return [];

    let prevInning = null;
    let prevInningTop = null;

    firstRow.data.forEach((item, index) => {
      if (item.inning !== undefined && item.inning_top !== undefined) {
        // イニングまたは表裏が変わったタイミングでマーカーを追加
        if (prevInning !== item.inning || prevInningTop !== item.inning_top) {
          markers.push({
            index,
            inning: item.inning,
            inningTop: item.inning_top,
          });
          prevInning = item.inning;
          prevInningTop = item.inning_top;
        }
      }
    });

    return markers;
  }, [analysisData]);

  if (!inningMarkers.length || !analysisData || !analysisData[0]) {
    return null;
  }

  const totalDataPoints = analysisData[0].data.length;

  return (
    <div className="inning-overlay">
      {inningMarkers.map((marker, idx) => {
        const leftPercent = (marker.index / totalDataPoints) * 100;

        return (
          <div key={idx} className="inning-marker" style={{ left: `${leftPercent}%` }}>
            <span className="inning-arrow">{marker.inningTop ? "▲" : "▼"}</span>
            <span className="inning-number">{marker.inning}</span>
          </div>
        );
      })}
    </div>
  );
};

export default InningOverlay;
