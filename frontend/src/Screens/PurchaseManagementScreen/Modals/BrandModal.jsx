import {
  Alert,
  Button,
  IconButton,
  OutlinedInput,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CyanFillButton,
  CyanOutlineButton,
} from "../../../shared/sharedStyles";
import BasicModal from "../../../shared/BasicModal";
import AddIcon from "@mui/icons-material/Add";
import {
  ApiStates,
  RedColor,
  primaryMediumColor,
} from "../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, addBrand, deleteBrand } from "../../../apis/brands"; // Import the addBrand action creator
import { resetFields } from "../../../store/slices/brandSlice";
import {
  SmallStyledTableCell,
  StyledTableCell,
  StyledTableRow,
} from "../purchaseManagement.styled";
import DeleteIcon from "@mui/icons-material/Delete";
import GradientCircularProgress from "../../../components/loader";

const BrandModal = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState(""); // State to hold the new brand name

  const { brandInto, addBrandApiStatus, error, success, deleteBrandApiStatus } =
    useSelector((state) => state.brands);

  useEffect(() => {
    if (
      addBrandApiStatus === ApiStates.success ||
      deleteBrandApiStatus === ApiStates.success
    ) {
      dispatch(fetchBrands());
    }
  }, [dispatch, addBrandApiStatus, deleteBrandApiStatus]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(resetFields());
  };

  const handleAddBrand = () => {
    dispatch(addBrand({ name: newBrandName }));
    setNewBrandName("");
  };
  const BrandDeleteHandler = (id) => {
    dispatch(deleteBrand({ id }));
  };

  return (
    <>
      <Typography variant="body2" fontWeight="bold">
        <CyanFillButton onClick={handleOpenModal}>
          <Typography fontWeight="bold" variant="subtitle1">
            Brand
          </Typography>{" "}
          <AddIcon />
        </CyanFillButton>
      </Typography>

      <BasicModal open={openModal} handleClose={handleCloseModal}>
        {error ? (
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
              ></IconButton>
            }
          >
            {error}
          </Alert>
        ) : null}

        {success ? (
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
              ></IconButton>
            }
          >
            {success}
          </Alert>
        ) : null}

        <Typography
          variant="body1"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          Brand Details
        </Typography>
        <Stack direction="row" sx={{ py: 3 }} justifyContent="space-between">
          {/* Input field for entering new brand name */}
          <OutlinedInput
            size="small"
            value={newBrandName}
            placeholder="Brand Name"
            onChange={(e) => setNewBrandName(e.target.value)}
          />
          {/* Button to add the brand */}
          <CyanOutlineButton
            variant="outlined"
            disabled={addBrandApiStatus === ApiStates.pending}
            onClick={handleAddBrand}
          >
            {addBrandApiStatus === "pending" ? (
              <GradientCircularProgress color="inherit" />
            ) : (
              <>Add +</>
            )}
          </CyanOutlineButton>
        </Stack>

        <Typography variant="body2" gutterBottom fontWeight="bold">
          Brand List
        </Typography>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {/* {fetchBrandsApiStatus === ApiStates.success ? ( */}

          <TableContainer component={Paper}>
            {/* All Order Table */}
            <Table aria-label="customized table">
              <TableHead>
                <TableRow sx={{ backgroundColor: primaryMediumColor }}>
                  <SmallStyledTableCell>DATE</SmallStyledTableCell>
                  <SmallStyledTableCell align="right">
                    BRAND
                  </SmallStyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brandInto?.length ? (
                  brandInto.map((item) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell>
                        <Typography variant="body2">{item.name}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button onClick={() => BrandDeleteHandler(item._id)}>
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

export default BrandModal;
