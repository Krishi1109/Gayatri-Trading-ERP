import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../utils/formatDates.js";
import "../../shared/sharedStyles.js";
import { TableHead, TableRow, Typography, Autocomplete, TextField, Stack, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";
import { getStatusColor } from "./purchaseManagement.styled.js";
import { StyledTableCell, StyledTableRow } from "../../shared/TableStyles.js";
import ShowOrdersModalComponent from "./Modals/ShowOrdersModalComponent.jsx";
import { ApiStates, GrayColor, RedColor, purchaseOrderStatus } from "../../shared/constants.js";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPurchaseQtyModal from "./Modals/AddPurchaseQtyModal.jsx";
import { deletePurchaseEntry, fetchPurchaseList } from "../../apis/purchase.js";

const PurchaseListTable = () => {
  const dispatch = useDispatch();
  const { purchaseInfo, deletePurchaseEntryApiStatus } = useSelector((state) => state.purchase);
  const { brandInfo } = useSelector((state) => state.brands);
  const { categoryInto } = useSelector((state) => state.categories);

  const [tableData, setTableData] = useState(purchaseInfo);
  const [page, setPage] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPurchaseOrderStatus, setSelectedPurchaseOrderStatus] = useState([]);

  // ⭐ NEW: Date Range States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (deletePurchaseEntryApiStatus === ApiStates.success) {
      dispatch(fetchPurchaseList());
    }
  }, [dispatch, deletePurchaseEntryApiStatus]);

  useEffect(() => {
    filterData(selectedBrand, selectedCategory, selectedPurchaseOrderStatus, startDate, endDate);
  }, [purchaseInfo]);

  useEffect(() => {
    filterData(selectedBrand, selectedCategory, selectedPurchaseOrderStatus, startDate, endDate);
    setPage(1);
  }, [selectedBrand, selectedCategory, selectedPurchaseOrderStatus, startDate, endDate]);

  // ⭐ UPDATED FILTER FUNCTION
  const filterData = (brand, category, status, start, end) => {
    let filteredData = purchaseInfo;

    if (brand) {
      filteredData = filteredData.filter((item) => item.brand && item.brand.toLowerCase().includes(brand.toLowerCase()));
    }

    if (category) {
      filteredData = filteredData.filter((item) => item.category && item.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (status && status.length > 0) {
      filteredData = filteredData.filter((item) => status.map((s) => s.toLowerCase()).includes(item.status.toLowerCase()));
    }

    // ⭐ DATE RANGE FILTER
    if (start) {
      filteredData = filteredData.filter((item) => new Date(item.createdAt) >= new Date(start));
    }

    if (end) {
      const endDateWithTime = new Date(end);
      endDateWithTime.setHours(23, 59, 59, 999);
      filteredData = filteredData.filter((item) => new Date(item.createdAt) <= endDateWithTime);
    }

    setTableData(filteredData);
  };

  const slicedData = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const totalRemainingQty = tableData.reduce((sum, item) => {
    return sum + (item.qty - item.ordered_qty);
  }, 0);

  const PurchaseDeleteHandler = (id) => {
    dispatch(deletePurchaseEntry({ id }));
  };
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* LEFT SIDE — FILTERS */}
        <Stack direction="row" gap={2} alignItems="center">
          {/* Brand Filter */}
          <Autocomplete
            size="small"
            disablePortal
            options={brandInfo.map((r) => r.name)}
            value={selectedBrand}
            onChange={(e, value) => setSelectedBrand(value)}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Brand" />}
          />

          {/* Category Filter */}
          <Autocomplete
            size="small"
            disablePortal
            options={categoryInto.map((r) => r.name)}
            value={selectedCategory}
            onChange={(e, value) => setSelectedCategory(value)}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />

          {/* Status Filter - Multiple */}
          <Autocomplete
            multiple
            size="small"
            disablePortal
            options={purchaseOrderStatus.map((r) => r.label)}
            value={selectedPurchaseOrderStatus}
            onChange={(e, value) => setSelectedPurchaseOrderStatus(value)}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />

          {/* Start Date */}
          <TextField
            label="Start Date"
            type="date"
            size="small"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ width: 160 }}
            InputLabelProps={{ shrink: true }}
          />

          {/* End Date */}
          <TextField
            label="End Date"
            type="date"
            size="small"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ width: 160 }}
            InputLabelProps={{ shrink: true }}
          />

          {/* CLEAR BUTTON */}
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setSelectedBrand("");
              setSelectedCategory("");
              setSelectedPurchaseOrderStatus([]);
              setStartDate("");
              setEndDate("");
            }}
            sx={{ height: 40, minWidth: 40 }}
          >
            X
          </Button>
        </Stack>

        {/* RIGHT SIDE — REMAINING QTY */}
        <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
          Remaining Qty: {totalRemainingQty}
        </Typography>
      </Stack>

      <TableContainer component={Paper}>
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
                <StyledTableCell>
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
                    <span style={{ color: GrayColor }}> X {item.items_per_package}</span>
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
                  <ShowOrdersModalComponent brand={item.brand} label={"Show Orders"} orders={item.orders} qty={item.qty} ordered_qty={item.ordered_qty} />
                </StyledTableCell>

                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.qty - item.ordered_qty}
                  </Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold" color={getStatusColor(item.status)}>
                    {item.status}
                  </Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Stack direction="row">
                    <AddPurchaseQtyModal id={item._id} />
                    <Button onClick={() => PurchaseDeleteHandler(item._id)} sx={{ px: 0 }}>
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

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
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
