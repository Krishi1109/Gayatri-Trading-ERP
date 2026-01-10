import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, TextField, Button, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CyanOutlineButton } from "../../shared/sharedStyles";
import BasicModal from "../../shared/BasicModal";
import formatDate from "../../utils/formatDates";
import { GreenColor, primaryMediumColor } from "../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPartyPayment, fetchPaymentsByBillId } from "../../apis/partyPayment";

const AddPaymentModal = ({ label, partyId, bill }) => {
  const [openModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const dispatch = useDispatch();
  const { payments = [], billInfo, addPaymentApiStatus, fetchPaymentsApiStatus } = useSelector((state) => state.partyPayment || {});

  // Safely calculate amounts
  const totalReceived = bill?.received_amount || 0;
  const pendingAmount = (bill?.bill_amount || 0) - totalReceived;

  // Open / Close Modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Fetch payments when modal opens
  useEffect(() => {
    if (openModal && bill?._id) {
      dispatch(fetchPaymentsByBillId({ bill_id: bill._id }));
    }
  }, [openModal, bill?._id, dispatch, addPaymentApiStatus]);

  // Add Payment
  const handleAddPayment = () => {
    const paymentAmount = Number(amount);
    if (!paymentAmount || paymentAmount > pendingAmount) return;

    dispatch(
      addPartyPayment({
        party_id: partyId,
        bill_id: bill._id,
        amount: Math.abs(paymentAmount), // always negative
        note,
      })
    );

    setAmount("");
    setNote("");
  };

  return (
    <>
      <CyanOutlineButton variant="outlined" onClick={handleOpenModal}>
        {label}
      </CyanOutlineButton>

      <BasicModal open={openModal} handleClose={handleCloseModal} minWidth={450} maxWidth={450}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Bill Payments
        </Typography>

        {/* Bill Summary */}
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Stack spacing={0.5}>
            <Typography variant="body2">
              Total Bill Amount: <strong>₹{billInfo?.billAmount}</strong>
            </Typography>
            <Typography variant="body2" color={GreenColor}>
              Total Paid Amount: <strong>₹{billInfo?.totalPaid}</strong>
            </Typography>
            <Typography variant="body2" color={primaryMediumColor}>
              Pending Amount: <strong>₹{billInfo?.pendingAmount}</strong>
            </Typography>
          </Stack>
        </Paper>

        {/* Add Payment Form */}
        <Typography fontWeight="bold" variant="body2" mb={1}>
          Add Payment
        </Typography>
        <Stack spacing={1.5} mb={2}>
          <TextField
            label="Amount"
            size="small"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={Number(amount) > pendingAmount}
            helperText={Number(amount) > pendingAmount ? "Amount exceeds pending bill amount" : ""}
          />
          <TextField label="Note" size="small" value={note} onChange={(e) => setNote(e.target.value)} />
          <Button
            variant="contained"
            color="primary"
            disabled={!amount || Number(amount) > pendingAmount || addPaymentApiStatus === "pending"}
            onClick={handleAddPayment}
          >
            Add Payment
          </Button>
        </Stack>

        <Divider sx={{ my: 1 }} />

        {/* Payment History */}
        <Typography fontWeight="bold" variant="body2" mb={1}>
          Previous Payments
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 200, overflowY: "auto" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchPaymentsApiStatus === "pending" ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : payments.length > 0 ? (
                payments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell align="right" sx={{ color: payment.amount < 0 ? "red" : "green", fontWeight: "bold" }}>
                      ₹{Math.abs(payment.amount)}
                    </TableCell>
                    <TableCell>{payment.note || "-"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No payments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </BasicModal>
    </>
  );
};

export default AddPaymentModal;
