import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseList } from "../../apis/purchase";
import formatDate from "../../utils/formatDates";
import "../../shared/sharedStyles.js";
import { Box, Container, TableHead, TableRow, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";
import {
  DarkStyledTableCell,
  StyledTableCell,
  StyledTableRow,
  getStatusColor,
} from "./purchaseManagement.styled";
import { CyanOutlineButton } from "../../shared/sharedStyles.js";
import ModalComponent from "./ModalComponent.jsx";

const PurchaseTable = () => {
  const dispatch = useDispatch();

  const { purchaseInfo } = useSelector((state) => state.purchase);
  const [tableData] = useState(purchaseInfo);
  const [page, setPage] = useState(Math.ceil(purchaseInfo.length / 10)); // Last page by default
  const rowsPerPage = 10; // Number of rows per page

  useEffect(() => {
    dispatch(fetchPurchaseList());
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const slicedData = tableData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const filteredData = tableData.filter((item) => item.status === "ACTIVE");

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 5 }}>
        <TableContainer component={Paper}>
          {/* Active order Table */}
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <DarkStyledTableCell>DATE</DarkStyledTableCell>
                <DarkStyledTableCell>BRAND</DarkStyledTableCell>
                <DarkStyledTableCell>TYPE</DarkStyledTableCell>
                <DarkStyledTableCell>VARIATION</DarkStyledTableCell>
                <DarkStyledTableCell>PRICE</DarkStyledTableCell>
                <DarkStyledTableCell>QTY</DarkStyledTableCell>
                <DarkStyledTableCell>ORDERS</DarkStyledTableCell>
                <DarkStyledTableCell>REMAINING QTY</DarkStyledTableCell>
                <DarkStyledTableCell>STATUS</DarkStyledTableCell>
                <DarkStyledTableCell>ACTIONS</DarkStyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <StyledTableRow key={item.id}>
                  <DarkStyledTableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight="bold">
                      {formatDate(item.createdAt)}
                    </Typography>
                  </DarkStyledTableCell>
                  <DarkStyledTableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {item.brand}
                    </Typography>
                  </DarkStyledTableCell>
                  <DarkStyledTableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {item.oil_type}
                    </Typography>
                  </DarkStyledTableCell>
                  <DarkStyledTableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {item.package_variant}
                    </Typography>
                  </DarkStyledTableCell>
                  <DarkStyledTableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {item.price}
                    </Typography>
                  </DarkStyledTableCell>
                  <DarkStyledTableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {item.qty}
                    </Typography>
                  </DarkStyledTableCell>
                  <DarkStyledTableCell>
                    <ModalComponent
                      brand={item.brand}
                      label={"Show Orders"}
                      orders={item?.orders}
                      qty={item?.qty}
                      ordered_qty={item?.ordered_qty}
                    />
                  </DarkStyledTableCell>
                  <DarkStyledTableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {item?.qty - item?.ordered_qty}
                    </Typography>
                  </DarkStyledTableCell>
                  <DarkStyledTableCell>
                    <Typography
                      variant="body2"
                      color={getStatusColor(item.status)}
                      fontWeight={"bold"}
                    >
                      {item.status}
                    </Typography>
                  </DarkStyledTableCell>
                  <DarkStyledTableCell>demo</DarkStyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
              <StyledTableRow key={item.id}>
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
                    {item.oil_type}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.package_variant}
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
                  <ModalComponent
                    brand={item.brand}
                    label={"Show Orders"}
                    orders={item?.orders}
                    qty={item?.qty}
                    ordered_qty={item?.ordered_qty}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item?.qty - item?.ordered_qty}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography
                    variant="body2"
                    color={getStatusColor(item.status)}
                    fontWeight={"bold"}
                  >
                    {item.status}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <CyanOutlineButton variant="outlined">Demo</CyanOutlineButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagiantion for the table */}
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
    </Container>
  );
};

export default PurchaseTable;
