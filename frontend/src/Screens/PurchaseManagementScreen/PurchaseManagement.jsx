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
import UnitModal from "./Modals/UnitModal";

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
      {/* Main Heading */}
      <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
        Purchase Management
      </Typography>
      {/* Configuration buttons */}
      <Stack sx={{ py: 0.5 }} direction={"row"} justifyContent="space-between">
        <Stack direction={"row"} gap={0.5}>
          <BrandModal />
          <CategoryModal />
          <VariantModal />
          <UnitModal />
        </Stack>
        <Stack>
          <PurchaseEntryModal />
        </Stack>
      </Stack>
      {/* Table for the active purchase order */}
      <ActiveOrdersPurchaseTable />
      {/* Table for the all purchase order  */}
      <PurchaseListTable />
    </Container>
  );
};

export default StockManagement;
