import React, { useEffect } from "react";
import { fetchPurchaseList } from "../../apis/purchase";
import { useDispatch } from "react-redux";
import ActiveOrdersPurchaseTable from "./ActiveOrdersPurchaseTable";
import PurchaseListTable from "./PurchaseListTable";
import { Container, Stack, Typography } from "@mui/material";
import BrandModal from "./Modals/BrandModal";
import CategoryModal from "./Modals/CategoryModal";
import PurchaseEntryModal from "./Modals/PurchaseEntryModal";
import VariantModal from "./Modals/VariantModal";
import UnitModal from "./Modals/UnitModal";

const StockManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPurchaseList());
  }, [dispatch]);
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
