import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";

const BrandPieChart = () => {
  return (
    <Box >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </Box>
  );
};

export default BrandPieChart;
