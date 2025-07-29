import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";
import { setId } from "@/store/GameStore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const HeatMapItem = ({ analysisData }) => {
  const dispatch = useDispatch();

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

  const handleRowClick = (row) => {
    dispatch(
      setId({ p_id: Number(row.data.p_id), e_id: Number(row.data.e_id) }),
    );
  };

  return (
    <ResponsiveHeatMapCanvas
      data={analysisData}
      margin={{ top: 50, right: 0, bottom: 1, left: 13 }}
      valueFormat=">-.2s"
      axisTop={null}
      // axisRight={{ legend: "country", legendOffset: 40 }}
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
      legends={[
        {
          anchor: "left",
          translateX: 0,
          translateY: -50,
          length: 200,
          thickness: 10,
          direction: "row",
          tickPosition: "after",
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: ">-.2s",
          title: "Value →",
          titleAlign: "start",
          titleOffset: 4,
        },
      ]}
    />
  );
};

export default HeatMapItem;
