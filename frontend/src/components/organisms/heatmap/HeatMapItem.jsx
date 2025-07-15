import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";

const HeatMapItem = ({ data }) => (
  <ResponsiveHeatMapCanvas
    data={data}
    margin={{ top: 70, right: 60, bottom: 20, left: 80 }}
    valueFormat=">-.2s"
    axisTop={{ tickRotation: -90 }}
    axisRight={{ legend: "country", legendOffset: 40 }}
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
    legends={[
      {
        anchor: "left",
        translateX: -50,
        translateY: 0,
        length: 200,
        thickness: 10,
        direction: "column",
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

export default HeatMapItem;
