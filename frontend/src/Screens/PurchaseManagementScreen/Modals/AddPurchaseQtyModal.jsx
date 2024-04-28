import { Alert, Button, IconButton, OutlinedInput, Stack, Typography } from "@mui/material";
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

  const { error, success, addPurchaseOrderQtyApiStatus } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(fetchPurchaseList());
  }, [dispatch, addPurchaseOrderQtyApiStatus]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetPurchaseFields());
  };

  const handleAdPurchaseQty = () => {
    dispatch(addPurchaseOrderQty({ id: id, values: { order_qty: parseInt(purchaseOrderQty) } }));
    setPurchaseOrderQty();
  };
  return (
    <div>
      <Button sx={{ px: 0 }} onClick={handleOpenModal}>
        <Typography variant="body2" color={primaryDarkColor}>
          <EditIcon />
        </Typography>
      </Button>

      <BasicModal open={openModal} handleClose={handleCloseModal} minWidth={500} maxWidth={500}>
        {error ? (
          <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small"></IconButton>}>
            {error}
          </Alert>
        ) : null}

        {success ? (
          <Alert severity="success" action={<IconButton aria-label="close" color="inherit" size="small"></IconButton>}>
            {success}
          </Alert>
        ) : null}

        <Typography variant="body1" gutterBottom fontWeight="bold" textAlign="center">
          Add Purchase Order
        </Typography>
        <Stack direction="row" sx={{ py: 3 }} justifyContent="space-between">
          <OutlinedInput size="small" value={purchaseOrderQty} placeholder="Enter Qty" onChange={(e) => setPurchaseOrderQty(e.target.value)} />
          <CyanOutlineButton variant="outlined" disabled={addPurchaseOrderQtyApiStatus === ApiStates.pending} onClick={handleAdPurchaseQty}>
            {addPurchaseOrderQtyApiStatus === "pending" ? <GradientCircularProgress color="inherit" /> : <>Add +</>}
          </CyanOutlineButton>
        </Stack>
      </BasicModal>
    </div>
  );
};

export default AddPurchaseQtyModal;
