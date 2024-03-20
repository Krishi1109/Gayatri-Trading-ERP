import React, { useState } from "react";
import { useSelector } from "react-redux";
import formatDate from "../../utils/formatDates.js";
import "../../shared/sharedStyles.js";
import { TableHead, TableRow, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Pagination from "@mui/material/Pagination";
import {
  StyledTableCell,
  StyledTableRow,
  getStatusColor,
} from "./purchaseManagement.styled.js";
import { CyanOutlineButton } from "../../shared/sharedStyles.js";
import ShowOrdersModalComponent from "./Modals/ShowOrdersModalComponent.jsx";
import { GrayColor } from "../../shared/constants.js";

const PurchaseListTable = () => {
  const { purchaseInfo } = useSelector((state) => state.purchase);
  const [tableData] = useState(purchaseInfo);
  const [page, setPage] = useState(Math.ceil(purchaseInfo.length / 10)); // Last page by default
  const rowsPerPage = 10; // Number of rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const slicedData = tableData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
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
                    {item.oil_type}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.weight} {item.unit}
                    <span style={{ color: `${GrayColor}` }}>
                      {" "}
                      X {item.items_per_package}
                    </span>
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
                  <ShowOrdersModalComponent
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
    </>
  );
};

export default PurchaseListTable;
