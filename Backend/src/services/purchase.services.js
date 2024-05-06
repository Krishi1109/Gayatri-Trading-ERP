import Purchase from "../models/purchase";
import formatIndianCurrency from "../utils/formatIndianCurrency";

const purchaseAmountByStatus = async (year) => {
  // Conditionally set the $match stage based on whether 'year' is provided
  let matchCondition = {};
  if (year) {
    matchCondition = {
      $expr: {
        $eq: [{ $year: "$createdAt" }, parseInt(year)],
      },
    };
  }

  const queryResponse = await Purchase.aggregate([
    {
      $match: matchCondition,
    },
    {
      $group: {
        _id: "$status",
        totalAmount: {
          $sum: { $multiply: ["$price", "$items_per_package", "$qty"] },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const totalAmountSum = queryResponse.reduce((sum, item) => sum + item.totalAmount, 0);

  // Map the array and transform each object
  const transformedData = queryResponse.map((item) => ({
    status: `${item._id.toLowerCase()} orders`,
    totalAmount: formatIndianCurrency(item.totalAmount),
    count: item.count,
  }));

  // Add an object representing the sum of totalAmount
  transformedData.push({
    status: "all orders",
    totalAmount: formatIndianCurrency(totalAmountSum),
    count: queryResponse.reduce((sum, item) => sum + item.count, 0),
  });
  console.log(transformedData);
  return { success: true, message: "Successfully fetched total purchase amount by status", result: transformedData };
};

const purchaseTotalAmountByMonth = async () => {
  const monthlyTotalAmounts = await Purchase.aggregate([
    {
      $match: { status: "COMPLETED" },
    },
    {
      $group: {
        _id: { $month: "$createdAt" }, // Group by month
        totalAmount: {
          $sum: { $multiply: ["$price", "$items_per_package", "$qty"] }, // Calculate total amount
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id",
        totalAmount: 1,
      },
    },
    {
      $sort: { month: 1 }, // Sort by month in ascending order
    },
  ]);

  // Create an array with 12 months
  const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

  // Map over the allMonths array and fill in missing months with 0 total amount
  const result = allMonths.map((month) => {
    const existingData = monthlyTotalAmounts.find((item) => item.month === month);
    return existingData ? existingData : { month, totalAmount: 0 };
  });
  return { success: true, message: "Successfully fetched total purchase amount by month", result };
};
const purchaseServices = {
  purchaseAmountByStatus,
  purchaseTotalAmountByMonth,
};

export default purchaseServices;
