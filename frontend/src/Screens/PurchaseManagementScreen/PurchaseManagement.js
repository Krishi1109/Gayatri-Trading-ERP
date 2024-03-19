import React from "react";
import PurchaseTable from "./PurchaseTable";

const StockManagement = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center my-4 font-bold text-xl border-b">
        Purchase Management
      </h1>
      <PurchaseTable />
    </div>
  );
};

export default StockManagement;
