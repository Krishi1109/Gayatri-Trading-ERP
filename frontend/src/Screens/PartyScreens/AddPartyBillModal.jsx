import { Alert, Stack, TextField, Typography, Autocomplete } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CyanFillButton, GreenFillButton } from "../../shared/sharedStyles";
import BasicModal from "../../shared/BasicModal";
import AddIcon from "@mui/icons-material/Add";
import { ApiStates } from "../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchPartiesAuto } from "../../apis/party";
import { addPartyBill } from "../../apis/partyBill";
import { resetFields as resetPartyBill } from "../../store/slices/partyBillSlice";
import GradientCircularProgress from "../../components/loader";

const PartyBillModal = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [searchParty, setSearchParty] = useState("");

  /* ---------------- REDUX STATE ---------------- */

  // Party autocomplete (partySlice)
  const { partyListAuto = [], fetchPartiesAutoApiStatus } = useSelector((state) => state.parties);

  // Add party bill (partyBillsSlice)
  const { addPartyBillApiStatus, error, success } = useSelector((state) => state.partyBills);

  /* ---------------- MODAL HANDLERS ---------------- */

  const handleOpenModal = () => {
    setOpenModal(true);
    dispatch(fetchPartiesAuto({ page: 1, limit: 10 }));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetPartyBill());
    formik.resetForm();
  };

  /* ---------------- FETCH PARTY SEARCH ---------------- */

  useEffect(() => {
    if (openModal) {
      dispatch(fetchPartiesAuto({ search: searchParty, page: 1, limit: 10 }));
    }
  }, [searchParty, openModal, dispatch]);

  /* ---------------- AUTO CLOSE ON SUCCESS ---------------- */

  useEffect(() => {
    if (addPartyBillApiStatus === ApiStates.success) {
      formik.resetForm();
    }
  }, [addPartyBillApiStatus]);

  /* ---------------- FORM ---------------- */

  const formik = useFormik({
    initialValues: {
      party: null,
      amount: "",
      billDate: "",
      note: "",
    },

    validationSchema: Yup.object({
      party: Yup.object().nullable().required("Party is required"),
      amount: Yup.number().typeError("Amount must be a number").positive("Amount must be greater than 0").required("Amount is required"),
      billDate: Yup.date().required("Date is required"),
      note: Yup.string().required("Note is required"),
    }),

    onSubmit: (values) => {
      const payload = {
        partyId: values.party._id,
        billAmount: values.amount,
        date: values.billDate,
        note: values.note,
      };

      dispatch(addPartyBill(payload));
    },
  });

  /* ---------------- UI ---------------- */

  return (
    <>
      <CyanFillButton onClick={handleOpenModal}>
        <Typography fontWeight="bold">Party Bill</Typography>
        <AddIcon />
      </CyanFillButton>

      <BasicModal open={openModal} handleClose={handleCloseModal} minWidth={500} maxWidth={600}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Typography textAlign="center" fontWeight="bold" mb={2}>
          Add Party Bill
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {/* PARTY AUTOCOMPLETE */}
          <Autocomplete
            sx={{ py: 1 }}
            options={partyListAuto}
            value={formik.values.party}
            isOptionEqualToValue={(o, v) => o._id === v?._id}
            getOptionLabel={(o) => `${o?.code} - ${o?.name}` || ""}
            onInputChange={(_, value) => setSearchParty(value)}
            onChange={(_, value) => formik.setFieldValue("party", value)}
            loading={fetchPartiesAutoApiStatus === ApiStates.pending}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Party"
                size="small"
                error={formik.touched.party && Boolean(formik.errors.party)}
                helperText={formik.touched.party && formik.errors.party}
              />
            )}
          />

          <Stack direction="row" gap={2} sx={{ py: 1 }}>
            {/* AMOUNT */}
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              size="small"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />

            {/* DATE */}
            <TextField
              fullWidth
              type="date"
              name="billDate"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={formik.values.billDate}
              onChange={formik.handleChange}
              error={formik.touched.billDate && Boolean(formik.errors.billDate)}
              helperText={formik.touched.billDate && formik.errors.billDate}
            />
          </Stack>

          <Stack direction="row" gap={2} sx={{ py: 1 }}>
            {/* NOTE */}
            <TextField
              fullWidth
              label="Note"
              name="note"
              size="small"
              multiline
              value={formik.values.note}
              onChange={formik.handleChange}
              error={formik.touched.note && Boolean(formik.errors.note)}
              helperText={formik.touched.note && formik.errors.note}
            />

            {/* SUBMIT */}
            <GreenFillButton type="submit" disabled={addPartyBillApiStatus === ApiStates.pending}>
              {addPartyBillApiStatus === ApiStates.pending ? <GradientCircularProgress color="inherit" /> : "Add+"}
            </GreenFillButton>
          </Stack>
        </form>
      </BasicModal>
    </>
  );
};

export default PartyBillModal;
