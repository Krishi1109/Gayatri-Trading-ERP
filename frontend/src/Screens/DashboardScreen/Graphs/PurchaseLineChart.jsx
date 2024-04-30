import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const Groundnut = [4000, 3000, 2000, 5000, 2000, 2560, 2150, 5984, 7851, 1526, 1250, 1256];
const xLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JLY", "AUG", "SEP", "OTC", "NOV", "DEC"];

const PurchaseLineChart = () => {
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <LineChart height={300} series={[{ data: Groundnut, label: "Purchase" }]} xAxis={[{ scaleType: "point", data: xLabels }]} />
    </div>
  );
};

export default PurchaseLineChart;
