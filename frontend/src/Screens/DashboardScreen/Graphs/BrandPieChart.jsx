import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const BrandPieChart = () => {
  const { purchaseTotalAmountByBrandData } = useSelector((state) => state.purchase);

  const chartData = purchaseTotalAmountByBrandData.map((item, index) => ({
    id: index,
    value: item.totalAmount,
    label: item._id,
  }));

  return (
    <Box>
      <PieChart
        series={[
          {
            data: chartData,
          },
        ]}
        width={400}
        height={200}
      />
    </Box>
  );
};

export default BrandPieChart;
