import { Alert, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CyanFillButton, GreenFillButton } from "../../shared/sharedStyles";
import BasicModal from "../../shared/BasicModal";
import AddIcon from "@mui/icons-material/Add";
import { ApiStates } from "../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addParty } from "../../apis/party";
import { resetFields } from "../../store/slices/partySlice";
import GradientCircularProgress from "../../components/loader";

const PartyModal = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const { addPartyApiStatus, error, success } = useSelector((state) => state.parties);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetFields());
    formik.resetForm();
  };

  // -----------------------------
  // FORM WITH FORMIK + YUP
  // -----------------------------
  const formik = useFormik({
    initialValues: {
      party_name: "",
      party_code: "",
      mobile: "",
      address: "",
    },

    validationSchema: Yup.object({
      party_name: Yup.string().required("Party Name is required"),
      party_code: Yup.string().required("Party Code is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile number is required"),
      address: Yup.string().required("Address is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(
        addParty({
          name: values.party_name,
          code: values.party_code,
          mobile: values.mobile,
          address: values.address,
        })
      );

      //   resetForm();
    },
  });

  useEffect(() => {
    if (addPartyApiStatus === ApiStates.success) {
      //   dispatch(fetchPartys());
      formik.resetForm();
    }
  }, [addPartyApiStatus, dispatch]);

  return (
    <>
      <Typography variant="body2" fontWeight="bold">
        <CyanFillButton onClick={handleOpenModal}>
          <Typography fontWeight="bold" variant="subtitle1">
            Party
          </Typography>
          <AddIcon />
        </CyanFillButton>
      </Typography>

      <BasicModal open={openModal} handleClose={handleCloseModal} minWidth={500} maxWidth={800}>
        {/* Alerts */}
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Typography variant="body1" gutterBottom fontWeight="bold" textAlign="center">
          Party Details
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {/* PARTY NAME */}
          <Stack direction="row" sx={{ py: 1 }}>
            <TextField
              fullWidth
              name="party_name"
              label="Party Name"
              size="small"
              value={formik.values.party_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.party_name && Boolean(formik.errors.party_name)}
              helperText={formik.touched.party_name && formik.errors.party_name}
            />
          </Stack>

          {/* PARTY CODE + MOBILE */}
          <Stack direction="row" gap={3} sx={{ py: 1 }}>
            <TextField
              fullWidth
              name="party_code"
              label="Party Code"
              size="small"
              value={formik.values.party_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.party_code && Boolean(formik.errors.party_code)}
              helperText={formik.touched.party_code && formik.errors.party_code}
            />

            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              size="small"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Stack>

          {/* ADDRESS + ADD BUTTON */}
          <Stack direction="row" gap={3} sx={{ py: 1 }}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              size="small"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />

            <GreenFillButton type="submit">
              <Typography variant="body1" fontWeight={"bold"}>
                {addPartyApiStatus === "pending" ? <GradientCircularProgress color="inherit" /> : <>Add+</>}
              </Typography>
            </GreenFillButton>
          </Stack>
        </form>
      </BasicModal>
    </>
  );
};

export default PartyModal;
