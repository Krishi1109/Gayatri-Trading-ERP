import React, { useState } from "react";

const StockTable = () => {
  // Dummy data for table rows
  const [tableData, setTableData] = useState([
    {
      brand: "Brand 1",
      type: "Type 1",
      variation: "Variation 1",
      qty: 10,
      orders: "20 - 10/2",
      remainingQty: 90,
      status: "Active",
      actions: "Edit/Delete",
    },
    {
      brand: "Brand 10",
      type: "Type 10",
      variation: "Variation 10",
      qty: 55,
      orders: "550",
      remainingQty: 520,
      status: "Inactive",
      actions: "Edit/Delete",
    },
  ]);

  // Pagination state
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(
    Math.ceil(tableData.length / itemsPerPage)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Filter data for active status
  const activeItems = tableData.filter((item) => item.status === "Active");

  return (
    <div className="px-5">
      <h2 className="text-lg font-semibold mb-2">Active Orders</h2>
      <div className="overflow-x-hidden">
        <table className="min-w-full border border-gray-700 bg-gray-800 text-white mb-6">
          {/* Table headers */}
          <thead className="bg-cyan-700">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Brand</th>
              <th className="px-6 py-3 text-left font-semibold">Type</th>
              <th className="px-6 py-3 text-left font-semibold">Variation</th>
              <th className="px-6 py-3 text-left font-semibold">Qty</th>
              <th className="px-6 py-3 text-left font-semibold">Orders</th>
              <th className="px-6 py-3 text-left font-semibold">
                Remaining Qty
              </th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="divide-y divide-gray-700">
            {/* Render active items */}
            {activeItems.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap">{item.brand}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.type}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.variation}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.qty}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.orders}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.remainingQty}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.status}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.actions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-hidden">
        <table className="min-w-full">
          {/* Table headers */}
          <thead className="bg-cyan-500">
            <tr>
              <th className="px-6 py-3 text-left text-base leading-4 font-semibold text-white uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-base leading-4 font-semibold text-white uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-base leading-4 font-semibold text-white uppercase tracking-wider">
                Variation
              </th>
              <th className="px-6 py-3 text-left text-base leading-4 font-semibold text-white uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-base leading-4 font-semibold text-white uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-base leading-4 font-semibold text-white uppercase tracking-wider">
                Remaining Qty
              </th>
              <th className="px-6 py-3 text-left text-base leading-4 font-semibold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-base leading-4 font-semibold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Render current items */}
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap">{item.brand}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.type}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.variation}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.qty}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.orders}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {item.remainingQty}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.status}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{item.actions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="flex items-center justify-center mt-4">
        <ul className="flex">
          <li>
            {/* Previous button */}
            <button
              onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md"
            >
              Previous
            </button>
          </li>
          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => paginate(pageNumber)}
                  className={`px-3 py-1 ${
                    currentPage === pageNumber
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } focus:outline-none`}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
          <li>
            {/* Next button */}
            <button
              onClick={() =>
                paginate(
                  currentPage === totalPages ? currentPage : currentPage + 1
                )
              }
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StockTable;
