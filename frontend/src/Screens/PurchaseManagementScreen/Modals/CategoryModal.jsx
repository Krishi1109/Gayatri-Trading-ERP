import { Alert, Button, IconButton, OutlinedInput, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CyanFillButton, CyanOutlineButton } from "../../../shared/sharedStyles";
import BasicModal from "../../../shared/BasicModal";
import AddIcon from "@mui/icons-material/Add";
import { ApiStates, RedColor, primaryMediumColor } from "../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { resetFields } from "../../../store/slices/categorySlice";
import { SmallStyledTableCell, StyledTableCell, StyledTableRow } from "../purchaseManagement.styled";
import DeleteIcon from "@mui/icons-material/Delete";
import GradientCircularProgress from "../../../components/loader";
import { addCategory, deleteCategory, fetchCategories } from "../../../apis/categories";

const CategoryModal = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(""); // State to hold the new category name

  const { categoryInto, addCategoryApiStatus, error, success, deleteCategoryApiStatus } = useSelector((state) => state.categories);

  useEffect(() => {
    if (addCategoryApiStatus === ApiStates.success || deleteCategoryApiStatus === ApiStates.success) {
      dispatch(fetchCategories());
    }
  }, [dispatch, addCategoryApiStatus, deleteCategoryApiStatus]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetFields());
  };

  const handleAddCategory = () => {
    dispatch(addCategory({ name: newCategoryName }));
    setNewCategoryName("");
  };
  const CategoryDeleteHandler = (id) => {
    dispatch(deleteCategory({ id }));
  };

  return (
    <>
      <Typography variant="body2" fontWeight="bold">
        <CyanFillButton onClick={handleOpenModal}>
          <Typography fontWeight="bold" variant="subtitle1">
            Category
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
          Category Details
        </Typography>
        <Stack direction="row" sx={{ py: 3 }} justifyContent="space-between">
          {/* Input field for entering new category name */}
          <OutlinedInput size="small" value={newCategoryName} placeholder="Category Name" onChange={(e) => setNewCategoryName(e.target.value)} />
          {/* Button to add the category */}
          <CyanOutlineButton variant="outlined" disabled={addCategoryApiStatus === ApiStates.pending} onClick={handleAddCategory}>
            {addCategoryApiStatus === "pending" ? <GradientCircularProgress color="inherit" /> : <>Add +</>}
          </CyanOutlineButton>
        </Stack>

        <Typography variant="body2" gutterBottom fontWeight="bold">
          Category List
        </Typography>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <TableContainer component={Paper}>
            {/* All Order Table */}
            <Table aria-label="customized table">
              <TableHead>
                <TableRow sx={{ backgroundColor: primaryMediumColor }}>
                  <SmallStyledTableCell>DATE</SmallStyledTableCell>
                  <SmallStyledTableCell align="right">BRAND</SmallStyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryInto?.length ? (
                  categoryInto.map((item) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell>
                        <Typography variant="body2">{item.name}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button onClick={() => CategoryDeleteHandler(item._id)}>
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
    </>
  );
};

export default CategoryModal;
