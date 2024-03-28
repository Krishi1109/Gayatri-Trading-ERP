import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { CyanOutlineButton } from "../../../shared/sharedStyles";
import BasicModal from "../../../shared/BasicModal";
import formatDate from "../../../utils/formatDates";
import { GreenColor, primaryMediumColor } from "../../../shared/constants";

const ShowOrdersModalComponent = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Typography variant="body2" fontWeight="bold">
        <CyanOutlineButton variant="outlined" onClick={handleOpenModal}>
          {props.label}
        </CyanOutlineButton>
      </Typography>
      <BasicModal
        open={openModal}
        handleClose={handleCloseModal}
        minWidth={400}
        maxWidth={400}
      >
        <Typography variant="body1" fontWeight="bold">
          Order Details
        </Typography>
        {/* Display order details in a table format */}
        <TableContainer component={Paper} sx={{ my: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="col">
                  Date
                </TableCell>
                <TableCell component="th" scope="col" align="right">
                  Order Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(order.order_date)}</TableCell>
                  <TableCell align="right">{order.order_qty}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={2} align="right">
                  <Typography
                    fontWeight="bold"
                    variant="body2"
                    color={
                      props.qty === props.ordered_qty
                        ? GreenColor
                        : primaryMediumColor
                    }
                  >
                    {props.ordered_qty} / {props.qty}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </BasicModal>
    </div>
  );
};

export default ShowOrdersModalComponent;
