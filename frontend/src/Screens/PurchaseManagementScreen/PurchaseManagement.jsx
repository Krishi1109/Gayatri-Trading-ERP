import React, { useEffect } from "react";
import { fetchPurchaseList } from "../../apis/purchase";
import { useDispatch, useSelector } from "react-redux";
import ActiveOrdersPurchaseTable from "./ActiveOrdersPurchaseTable";
import PurchaseListTable from "./PurchaseListTable";
import { Container, Stack } from "@mui/material";
import BrandModal from "./Modals/BrandModal";
import CategoryModal from "./Modals/CategoryModal";
import { fetchBrands } from "../../apis/brands";
import { fetchCategories } from "../../apis/categories";

const StockManagement = () => {
  const dispatch = useDispatch();

  const { deleteBrandApiStatus } = useSelector((state) => state.brands);
  useEffect(() => {
    dispatch(fetchPurchaseList());
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch, deleteBrandApiStatus]);
  return (
    <Container maxWidth="xl">
      <h1 className="text-center my-4 font-bold text-xl border-b">
        Purchase Management
      </h1>
      <ActiveOrdersPurchaseTable />
      <Stack sx={{ py: 5 }} direction={"row"} gap={3}>
        <BrandModal />
        <CategoryModal />
      </Stack>
      <PurchaseListTable />
    </Container>
  );
};

export default StockManagement;
