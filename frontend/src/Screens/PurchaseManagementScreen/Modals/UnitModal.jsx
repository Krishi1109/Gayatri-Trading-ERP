import { Alert, Button, IconButton, OutlinedInput, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CyanFillButton, CyanOutlineButton } from "../../../shared/sharedStyles";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "../../../shared/BasicModal";
import { useDispatch, useSelector } from "react-redux";
import { ApiStates, RedColor, primaryMediumColor } from "../../../shared/constants";
import { addUnit, deleteUnit, fetchUnits } from "../../../apis/unit"; // Import the addBrand action creator
import GradientCircularProgress from "../../../components/loader";
import { resetUnitFields } from "../../../store/slices/unitSlice";
import { SmallStyledTableCell, StyledTableCell, StyledTableRow } from "../purchaseManagement.styled";
import DeleteIcon from "@mui/icons-material/Delete";

const UnitModal = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [newUnit, setNewUnit] = useState("");

  const { unitInfo, addUnitApiStatus, error, success, deleteUnitApiStatus } = useSelector((state) => state.units);

  useEffect(() => {
    if (addUnitApiStatus === ApiStates.success || deleteUnitApiStatus === ApiStates.success) {
      dispatch(fetchUnits());
    }
  }, [dispatch, addUnitApiStatus, deleteUnitApiStatus]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetUnitFields());
  };

  const handleAddBrand = () => {
    dispatch(addUnit({ unit: newUnit }));
    setNewUnit("");
  };

  const UnittDeleteHandler = (id) => {
    dispatch(deleteUnit({ id }));
  };

  return (
    <div>
      <Typography variant="body2" fontWeight="bold">
        <CyanFillButton onClick={handleOpenModal}>
          <Typography fontWeight="bold" variant="subtitle1">
            Units
          </Typography>
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
          Units Details
        </Typography>
        <Stack direction="row" sx={{ py: 3 }} justifyContent="space-between">
          {/* Input field for entering new Unit */}
          <OutlinedInput size="small" value={newUnit} placeholder="Unit" onChange={(e) => setNewUnit(e.target.value)} />
          {/* Button to add the Unit */}
          <CyanOutlineButton variant="outlined" disabled={addUnitApiStatus === ApiStates.pending} onClick={handleAddBrand}>
            {addUnitApiStatus === "pending" ? <GradientCircularProgress color="inherit" /> : <>Add +</>}
          </CyanOutlineButton>
        </Stack>

        <Typography variant="body2" gutterBottom fontWeight="bold">
          Unit List
        </Typography>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <TableContainer component={Paper}>
            {/* All Order Table */}
            <Table aria-label="customized table">
              <TableHead>
                <TableRow sx={{ backgroundColor: primaryMediumColor }}>
                  <SmallStyledTableCell>Unit</SmallStyledTableCell>
                  <SmallStyledTableCell align="right">Actions</SmallStyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unitInfo?.length ? (
                  unitInfo.map((item) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell>
                        <Typography variant="body2">{item.unit}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button onClick={() => UnittDeleteHandler(item._id)}>
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

export default UnitModal;
