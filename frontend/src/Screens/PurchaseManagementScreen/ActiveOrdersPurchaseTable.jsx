import React, { useEffect, useState } from "react";
import { Button, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DarkStyledTableCell, StyledTableRow, getStatusColor } from "./purchaseManagement.styled";
import { useSelector } from "react-redux";
import formatDate from "../../utils/formatDates";
import ShowOrdersModalComponent from "./Modals/ShowOrdersModalComponent";
import AddPurchaseQtyModal from "./Modals/AddPurchaseQtyModal.jsx";
import { GrayColor, RedColor } from "../../shared/constants.js";
import DeleteIcon from "@mui/icons-material/Delete";

const ActiveOrdersPurchaseTable = () => {
  const { purchaseInfo, addPurchaseOrderQtyApiStatus } = useSelector((state) => state.purchase);

  const [tableData, setTableData] = useState(purchaseInfo);

  useEffect(() => {
    setTableData(purchaseInfo);
  }, [purchaseInfo]);

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
                  {item.variant} {item.unit}
                  <span style={{ color: `${GrayColor}` }}> X {item.items_per_package}</span>
                </Typography>
              </DarkStyledTableCell>
              <DarkStyledTableCell>
                <Typography variant="body2" fontWeight="bold">
                  ₹ {item.price}
                </Typography>
              </DarkStyledTableCell>
              <DarkStyledTableCell>
                <Typography variant="body2" fontWeight="bold">
                  {item.qty}
                </Typography>
              </DarkStyledTableCell>
              <DarkStyledTableCell>
                <ShowOrdersModalComponent brand={item.brand} label={"Show Orders"} orders={item?.orders} qty={item?.qty} ordered_qty={item?.ordered_qty} />
              </DarkStyledTableCell>
              <DarkStyledTableCell>
                <Typography variant="body2" fontWeight="bold">
                  {item?.qty - item?.ordered_qty}
                </Typography>
              </DarkStyledTableCell>
              <DarkStyledTableCell>
                <Typography variant="body2" color={getStatusColor(item.status)} fontWeight={"bold"}>
                  {item.status}
                </Typography>
              </DarkStyledTableCell>
              <DarkStyledTableCell>
                <Stack direction="row">
                  <AddPurchaseQtyModal id={item?._id} />
                  <Button sx={{ px: 0 }}>
                    <Typography variant="body2" color={RedColor}>
                      <DeleteIcon />
                    </Typography>
                  </Button>
                </Stack>
              </DarkStyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActiveOrdersPurchaseTable;
