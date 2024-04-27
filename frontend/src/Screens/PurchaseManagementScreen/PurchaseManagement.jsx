import React, { useEffect } from "react";
import { fetchPurchaseList } from "../../apis/purchase";
import { useDispatch, useSelector } from "react-redux";
import ActiveOrdersPurchaseTable from "./ActiveOrdersPurchaseTable";
import PurchaseListTable from "./PurchaseListTable";
import { Container, Stack, Typography } from "@mui/material";
import BrandModal from "./Modals/BrandModal";
import CategoryModal from "./Modals/CategoryModal";
import { fetchBrands } from "../../apis/brands";
import { fetchCategories } from "../../apis/categories";
import PurchaseEntryModal from "./Modals/PurchaseEntryModal";
import VariantModal from "./Modals/VariantModal";
import { fetchVariants } from "../../apis/variants";

const StockManagement = () => {
  const dispatch = useDispatch();

  const { deleteBrandApiStatus } = useSelector((state) => state.brands);
  useEffect(() => {
    dispatch(fetchPurchaseList());
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    dispatch(fetchVariants());
  }, [dispatch, deleteBrandApiStatus]);
  return (
    <Container maxWidth="xl">
      <Stack sx={{ py: 0 }} direction={"row"} justifyContent="space-between">
        <Stack direction={"row"} gap={3}>
          <BrandModal />
          <CategoryModal />
          <VariantModal />
        </Stack>
        <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
          Purchase Management
        </Typography>
        <PurchaseEntryModal />
      </Stack>
      <ActiveOrdersPurchaseTable />

      <PurchaseListTable />
    </Container>
  );
};

export default StockManagement;
