import React, { useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseAmountByMonth } from "../../../apis/purchase";

const Months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JLY", "AUG", "SEP", "OTC", "NOV", "DEC"];

const PurchaseLineChart = () => {
  const dispatch = useDispatch();
  const { purchaseAmountByMonthData } = useSelector((state) => state.purchase);

  // Extract totalAmount values for each month and convert them to numbers
  const amountData = Months.map((_, index) => {
    const data = purchaseAmountByMonthData.find((item) => item.month === index + 1);
    let amount = 0;

    if (data) {
      if (typeof data.totalAmount === "string") {
        amount = parseInt(data.totalAmount.replace(/₹|,/g, ""), 10) || 0;
      } else if (typeof data.totalAmount === "number") {
        amount = data.totalAmount;
      }
    }

    return amount;
  });

  useEffect(() => {
    dispatch(fetchPurchaseAmountByMonth());
  }, [dispatch]);

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <LineChart sx={{ p: 1 }} height={300} series={[{ data: amountData, label: "Purchase Amount" }]} xAxis={[{ scaleType: "point", data: Months }]} />
    </div>
  );
};

export default PurchaseLineChart;
