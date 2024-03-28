import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  DarkStyledTableCell,
  StyledTableRow,
  getStatusColor,
} from "./purchaseManagement.styled";
import { useSelector } from "react-redux";
import formatDate from "../../utils/formatDates";
import ShowOrdersModalComponent from "./Modals/ShowOrdersModalComponent";

const ActiveOrdersPurchaseTable = () => {
  const { purchaseInfo } = useSelector((state) => state.purchase);

  const [tableData] = useState(purchaseInfo);

  const filteredData = tableData.filter((item) => item.status === "ACTIVE");

  return (
  
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
              <StyledTableRow key={item._id}>
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
                    {item.category}
                  </Typography>
                </DarkStyledTableCell>
                <DarkStyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.weight}
                  </Typography>
                </DarkStyledTableCell>
                <DarkStyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                  ₹{" "}{item.price}
                  </Typography>
                </DarkStyledTableCell>
                <DarkStyledTableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {item.qty}
                  </Typography>
                </DarkStyledTableCell>
                <DarkStyledTableCell>
                  <ShowOrdersModalComponent
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
 
  );
};

export default ActiveOrdersPurchaseTable;
