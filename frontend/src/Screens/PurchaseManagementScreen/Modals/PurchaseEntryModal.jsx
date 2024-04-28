import { Alert, Autocomplete, Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CyanFillButton, GreenFillButton } from "../../../shared/sharedStyles";
import BasicModal from "../../../shared/BasicModal";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { ApiStates, item_per_pack } from "../../../shared/constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addPurchaseEntry, fetchPurchaseList } from "../../../apis/purchase";
import GradientCircularProgress from "../../../components/loader";
import { resetPurchaseFields } from "../../../store/slices/purchaseSlice";

const PurchaseEntryModal = (props) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    dispatch(resetPurchaseFields());
    setOpenModal(false);
  };

  const { brandInfo } = useSelector((state) => state.brands);
  const { categoryInto } = useSelector((state) => state.categories);
  const { variantInfo } = useSelector((state) => state.variants);
  const { unitInfo } = useSelector((state) => state.units);
  const { purchaseEntryApiStatus, error, success } = useSelector((state) => state.purchase);

  const { values, handleSubmit, handleChange, handleBlur, errors, touched, setFieldValue } = useFormik({
    initialValues: {
      brand: "",
      category: "",
      variant: "",
      unit: "",
      items_per_package: "",
      qty: "",
      price: "",
    },
    validationSchema: Yup.object().shape({
      brand: Yup.string().required("Brand is required"),
      category: Yup.string().required("Category is required"),
      variant: Yup.string().required("Weight is required"),
      unit: Yup.string().required("Unit is required"),
      items_per_package: Yup.string().required("Items Per Package is required"),
      qty: Yup.number("Invalid Input!").required("Qty is required"),
      price: Yup.number("Invalid Input!").required("Price is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addPurchaseEntry(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (purchaseEntryApiStatus === ApiStates.success) {
      dispatch(fetchPurchaseList());
    }
  }, [purchaseEntryApiStatus, dispatch]);

  return (
    <div>
      <Typography variant="body2" fontWeight="bold">
        <CyanFillButton onClick={handleOpenModal}>
          <Typography fontWeight="bold" variant="subtitle1">
            Purchase Entry
          </Typography>
          <AddIcon />
        </CyanFillButton>
      </Typography>
      <BasicModal open={openModal} handleClose={handleCloseModal} minWidth={500} maxWidth={800}>
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

        <Typography variant="body1" fontWeight="bold">
          Purchase Entry
        </Typography>
        <Box sx={{ py: 2 }}>
          <Stack direction={"row"} gap={3} justifyContent={"space-between"}>
            <Autocomplete
              size="small"
              disablePortal
              id="brand"
              options={brandInfo.map((r) => r.name)}
              value={values.brand}
              onChange={(e, value) => {
                setFieldValue("brand", value);
              }}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  error={errors.brand && touched.brand ? true : false}
                  helperText={errors.brand && touched.brand ? errors.brand : ""}
                  {...params}
                  label="Brand"
                />
              )}
            />

            <Autocomplete
              size="small"
              disablePortal
              id="category"
              options={categoryInto.map((r) => r.name)}
              value={values.category}
              onChange={(e, value) => {
                setFieldValue("category", value);
              }}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  error={errors.category && touched.category ? true : false}
                  helperText={errors.category && touched.category ? errors.category : ""}
                  {...params}
                  label="Category"
                />
              )}
            />
          </Stack>

          <Stack direction="row" gap={3} sx={{ py: 2 }}>
            <Autocomplete
              size="small"
              disablePortal
              id="Variant"
              options={variantInfo.map((r) => r.variant)}
              value={values.variant}
              onChange={(e, value) => {
                setFieldValue("variant", value);
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  error={errors.variant && touched.variant ? true : false}
                  helperText={errors.variant && touched.variant ? errors.variant : ""}
                  {...params}
                  label="Variant"
                />
              )}
            />
            <Autocomplete
              size="small"
              disablePortal
              id="unit"
              options={unitInfo.map((r) => r.unit)}
              value={values.unit}
              onChange={(e, value) => {
                setFieldValue("unit", value);
              }}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  error={errors.unit && touched.unit ? true : false}
                  helperText={errors.unit && touched.unit ? errors.unit : ""}
                  {...params}
                  label="Unit"
                />
              )}
            />
            <Autocomplete
              size="small"
              disablePortal
              id="items_per_package"
              options={item_per_pack.map((r) => r.label.toString())}
              value={values.items_per_package}
              onChange={(e, value) => {
                setFieldValue("items_per_package", value);
              }}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  error={errors.items_per_package && touched.items_per_package ? true : false}
                  helperText={errors.items_per_package && touched.items_per_package ? errors.items_per_package : ""}
                  {...params}
                  label="Item Per Package"
                />
              )}
            />
          </Stack>

          <Stack direction="row" gap={3}>
            <TextField
              id="qty"
              name="qty"
              label="Qty"
              variant="outlined"
              size="small"
              value={values.qty}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.qty && touched.qty ? true : false}
              helperText={errors.qty && touched.qty ? errors.qty : ""}
              fullWidth
            />
            <TextField
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              size="small"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.price && touched.price ? true : false}
              helperText={errors.price && touched.price ? errors.price : ""}
              fullWidth
            />
            <GreenFillButton onClick={() => handleSubmit()}>
              <Typography variant="body1" fontWeight={"bold"}>
                {purchaseEntryApiStatus === "pending" ? <GradientCircularProgress color="inherit" /> : <>Add+</>}
              </Typography>
            </GreenFillButton>
          </Stack>
        </Box>
      </BasicModal>
    </div>
  );
};

export default PurchaseEntryModal;
