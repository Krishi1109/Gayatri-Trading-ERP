import { Alert, Button, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ApiStates, primaryDarkColor } from "../../../shared/constants";
import EditIcon from "@mui/icons-material/Edit";
import BasicModal from "../../../shared/BasicModal";
import { useDispatch, useSelector } from "react-redux";
import { CyanOutlineButton } from "../../../shared/sharedStyles";
import GradientCircularProgress from "../../../components/loader";
import { addPurchaseOrderQty, fetchPurchaseList } from "../../../apis/purchase";
import { resetPurchaseFields } from "../../../store/slices/purchaseSlice";

const AddPurchaseQtyModal = ({ id }) => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [purchaseOrderQty, setPurchaseOrderQty] = useState();
  const [orderDate, setOrderDate] = useState(""); // ⭐ NEW: date state

  const { error, success, addPurchaseOrderQtyApiStatus } = useSelector((state) => state.purchase);

  useEffect(() => {
    if (addPurchaseOrderQtyApiStatus === ApiStates.success) {
      dispatch(fetchPurchaseList());
    }
  }, [dispatch, addPurchaseOrderQtyApiStatus]);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetPurchaseFields());
    setPurchaseOrderQty("");
    setOrderDate("");
  };

  const handleAdPurchaseQty = () => {
    const payload = {
      order_qty: parseInt(purchaseOrderQty),
    };

    if (orderDate) {
      payload.order_date = orderDate; // ⭐ add only if selected
    }

    dispatch(addPurchaseOrderQty({ id, values: payload }));
  };

  return (
    <div>
      <Button sx={{ px: 0 }} onClick={handleOpenModal}>
        <Typography variant="body2" color={primaryDarkColor}>
          <EditIcon />
        </Typography>
      </Button>

      <BasicModal open={openModal} handleClose={handleCloseModal} minWidth={500} maxWidth={500}>
        {error && <Alert severity="error">{error}</Alert>}

        {success && <Alert severity="success">{success}</Alert>}

        <Typography variant="body1" gutterBottom fontWeight="bold" textAlign="center">
          Add Purchase Order
        </Typography>

        <Stack direction="column" gap={2} sx={{ py: 2 }}>
          {/* Qty Input */}
          <OutlinedInput size="small" value={purchaseOrderQty} placeholder="Enter Qty" onChange={(e) => setPurchaseOrderQty(e.target.value)} />

          {/* ⭐ New Order Date */}
          <TextField
            label="Order Date"
            type="date"
            size="small"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <CyanOutlineButton variant="outlined" disabled={addPurchaseOrderQtyApiStatus === ApiStates.pending} onClick={handleAdPurchaseQty}>
            {addPurchaseOrderQtyApiStatus === "pending" ? <GradientCircularProgress color="inherit" /> : <>Add +</>}
          </CyanOutlineButton>
        </Stack>
      </BasicModal>
    </div>
  );
};

export default AddPurchaseQtyModal;
