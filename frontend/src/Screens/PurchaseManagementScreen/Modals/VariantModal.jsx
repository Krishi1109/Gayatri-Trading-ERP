import { Alert, Button, IconButton, OutlinedInput, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CyanFillButton, CyanOutlineButton } from "../../../shared/sharedStyles";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "../../../shared/BasicModal";
import { useDispatch, useSelector } from "react-redux";
import { ApiStates, RedColor, primaryMediumColor } from "../../../shared/constants";
import { addVariant, deleteVariant, fetchVariants } from "../../../apis/variants"; // Import the addBrand action creator
import GradientCircularProgress from "../../../components/loader";
import { resetVariantFields } from "../../../store/slices/variantSlice";
import { SmallStyledTableCell, StyledTableCell, StyledTableRow } from "../purchaseManagement.styled";
import DeleteIcon from "@mui/icons-material/Delete";

const VariantModal = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [newVariant, setNewVariant] = useState("");

  const { variantInfo, addVariantApiStatus, error, success, deleteVariantApiStatus } = useSelector((state) => state.variants);

  useEffect(() => {
    if (addVariantApiStatus === ApiStates.success || deleteVariantApiStatus === ApiStates.success) {
      dispatch(fetchVariants());
    }
  }, [dispatch, addVariantApiStatus, deleteVariantApiStatus]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetVariantFields());
  };

  const handleAddBrand = () => {
    dispatch(addVariant({ variant: newVariant }));
    setNewVariant("");
  };

  const VariantDeleteHandler = (id) => {
    dispatch(deleteVariant({ id }));
  };

  return (
    <div>
      <Typography variant="body2" fontWeight="bold">
        <CyanFillButton onClick={handleOpenModal}>
          <Typography fontWeight="bold" variant="subtitle1">
            Variant
          </Typography>{" "}
          <AddIcon />
        </CyanFillButton>
      </Typography>

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
          Variants Details
        </Typography>
        <Stack direction="row" sx={{ py: 3 }} justifyContent="space-between">
          {/* Input field for entering new variant */}
          <OutlinedInput size="small" value={newVariant} placeholder="Variant Name" onChange={(e) => setNewVariant(e.target.value)} />
          {/* Button to add the Variant */}
          <CyanOutlineButton variant="outlined" disabled={addVariantApiStatus === ApiStates.pending} onClick={handleAddBrand}>
            {addVariantApiStatus === "pending" ? <GradientCircularProgress color="inherit" /> : <>Add +</>}
          </CyanOutlineButton>
        </Stack>

        <Typography variant="body2" gutterBottom fontWeight="bold">
          Variany List
        </Typography>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <TableContainer component={Paper}>
            {/* All Order Table */}
            <Table aria-label="customized table">
              <TableHead>
                <TableRow sx={{ backgroundColor: primaryMediumColor }}>
                  <SmallStyledTableCell>Variant</SmallStyledTableCell>
                  <SmallStyledTableCell align="right">Actions</SmallStyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variantInfo?.length ? (
                  variantInfo.map((item) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell>
                        <Typography variant="body2">{item.variant}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button onClick={() => VariantDeleteHandler(item._id)}>
                          <Typography variant="body2" color={RedColor}>
                            <DeleteIcon />
                          </Typography>
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <div style={{ height: "50px", padding: "20px" }}>no data</div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </BasicModal>
    </div>
  );
};

export default VariantModal;
