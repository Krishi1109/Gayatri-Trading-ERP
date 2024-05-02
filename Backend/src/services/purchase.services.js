import Purchase from "../models/purchase";

const purchaseAmountByStatus = async () => {
  const queryResponse = await Purchase.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $year: "$createdAt" }, parseInt(2024)], // Filter documents based on the year
        },
      },
    },
    {
      $group: {
        _id: "$status",
        totalAmount: {
          $sum: { $multiply: ["$price", "$items_per_package", "$qty"] },
        },
        count: { $sum: 1 }, // Count the number of documents for each status
      },
    },
    {
      $sort: { _id: 1 }, // Sort by status in ascending order
    },
  ]);

  const totalAmountSum = queryResponse.reduce((sum, item) => sum + item.totalAmount, 0);

  // Map the array and transform each object
  const transformedData = queryResponse.map((item) => ({
    status: `${item._id.toLowerCase()} orders`,
    totalAmount: item.totalAmount,
    count: item.count,
  }));

  // Add an object representing the sum of totalAmount
  transformedData.push({
    status: "all orders",
    totalAmount: totalAmountSum,
    count: queryResponse.reduce((sum, item) => sum + item.count, 0),
  });

  return { success: true, message: "Successfully, Fetch total purchase amount by status", result: transformedData };
};

const purchaseServices = {
  purchaseAmountByStatus,
};

export default purchaseServices;
