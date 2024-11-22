import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import formatDate from "../../utils/formatDates.js";
import "../../shared/sharedStyles.js";
import { TableHead, TableRow, Typography, Autocomplete, TextField, Stack, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";
import { StyledTableCell, StyledTableRow, getStatusColor } from "./purchaseManagement.styled.js";
import ShowOrdersModalComponent from "./Modals/ShowOrdersModalComponent.jsx";
import { GrayColor, RedColor, purchaseOrderStatus } from "../../shared/constants.js";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPurchaseQtyModal from "./Modals/AddPurchaseQtyModal.jsx";

const PurchaseListTable = () => {
  const { purchaseInfo } = useSelector((state) => state.purchase);
  const { brandInfo } = useSelector((state) => state.brands);
  const { categoryInto } = useSelector((state) => state.categories);

  const [tableData, setTableData] = useState(purchaseInfo);
  const [page, setPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPurchaseOrderStatus, setSelectedPurchaseOrderStatus] = useState("");
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleBrandFilter = (event, value) => {
    setSelectedBrand(value);
  };

  const handleCategoryFilter = (event, value) => {
    setSelectedCategory(value);
  };

  const handlePurchaseOrderStatusFilter = (event, value) => {
    setSelectedPurchaseOrderStatus(value);
  };

  useEffect(() => {
    filterData(selectedBrand, selectedCategory, selectedPurchaseOrderStatus);
  }, [purchaseInfo]);

  useEffect(() => {
    filterData(selectedBrand, selectedCategory, selectedPurchaseOrderStatus);
    setPage(1);
  }, [selectedBrand, selectedCategory, selectedPurchaseOrderStatus]);

  const filterData = (brand, category, status) => {
    let filteredData = purchaseInfo;

    if (brand) {
      filteredData = filteredData.filter((item) => item.brand && item.brand.toLowerCase().includes(brand.toLowerCase()));
    }

    if (category) {
      filteredData = filteredData.filter((item) => item.category && item.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (status) {
      filteredData = filteredData.filter((item) => {
        return item.status && item.status.toLowerCase() === `${status.toLowerCase()}`;
      });
    }

    setTableData(filteredData);
    // setPage(1); // Reset page when applying filter
  };

  const slicedData = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  return (
    <>
      <Stack direction="row" gap={2} sx={{ my: 2 }}>
        {/* Brand Filter */}
        <div>
          <Autocomplete
            size="small"
            disablePortal
            id="text-btrand"
            options={brandInfo.map((r) => r.name)}
            onChange={(e, value) => handleBrandFilter(e, value)}
            value={selectedBrand}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Brand" />}
          />
        </div>

        <div>
          <Autocomplete
            size="small"
            disablePortal
            id="text-btrand"
            options={categoryInto.map((r) => r.name)}
            onChange={(e, value) => handleCategoryFilter(e, value)}
            value={selectedCategory}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
        </div>

        <div>
          <Autocomplete
            size="small"
            disablePortal
            id="text-btrand"
            options={purchaseOrderStatus.map((r) => r.label)}
            onChange={(e, value) => handlePurchaseOrderStatusFilter(e, value)}
            value={selectedPurchaseOrderStatus}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
        </div>
      </Stack>

      <TableContainer component={Paper}>
        {/* All Order Table */}
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>DATE</StyledTableCell>
              <StyledTableCell>BRAND</StyledTableCell>
              <StyledTableCell>TYPE</StyledTableCell>
              <StyledTableCell>VARIATION</StyledTableCell>
              <StyledTableCell>PRICE</StyledTableCell>
              <StyledTableCell>QTY</StyledTableCell>
              <StyledTableCell>ORDERS</StyledTableCell>
              <StyledTableCell>REMAINING QTY</StyledTableCell>
              <StyledTableCell>STATUS</StyledTableCell>
              <StyledTableCell>ACTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  <Typography variant="body2" fontWeight="bold">
                    {formatDate(item.createdAt)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.brand}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.category}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.variant} {item.unit}
                    <span style={{ color: `${GrayColor}` }}> X {item.items_per_package}</span>
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.price}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.qty}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <ShowOrdersModalComponent brand={item.brand} label={"Show Orders"} orders={item?.orders} qty={item?.qty} ordered_qty={item?.ordered_qty} />
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item?.qty - item?.ordered_qty}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" color={getStatusColor(item.status)} fontWeight={"bold"}>
                    {item.status}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row">
                    <AddPurchaseQtyModal id={item?._id} />
                    <Button sx={{ px: 0 }}>
                      <Typography variant="body2" color={RedColor}>
                        <DeleteIcon />
                      </Typography>
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination for the table */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          count={Math.ceil(tableData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
        />
      </div>
    </>
  );
};

export default PurchaseListTable;
