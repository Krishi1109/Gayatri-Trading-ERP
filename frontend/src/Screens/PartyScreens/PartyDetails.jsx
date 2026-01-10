import { Typography, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Container, CircularProgress, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DarkStyledTableCell, StyledTableCell, StyledTableRow } from "../../shared/TableStyles";
import { primaryDarkColor } from "../../shared/constants";
import { fetchPartyBillsByPartyId } from "../../apis/partyBill";
import { CyanOutlineButton } from "../../shared/sharedStyles";
import AddPaymentModal from "./AddPaymentModal";

const PartyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { partyList } = useSelector((state) => state.parties);
  const { partyBillsById, fetchPartyBillsApiStatus, pagination } = useSelector((state) => state.partyBills);

  const [page, setPage] = useState(1);

  const party = partyList.find((p) => p._id === id);

  // 🔹 Fetch bills when page or party changes
  useEffect(() => {
    if (id) {
      dispatch(fetchPartyBillsByPartyId({ partyId: id, page, limit: 10 }));
    }
  }, [dispatch, id, page]);

  return (
    <Container maxWidth="xl">
      {/* PARTY HEADER */}
      <Paper sx={{ p: 2, mb: 3 }}>
        {party ? (
          <Typography variant="h6" fontWeight="bold" sx={{ color: primaryDarkColor }}>
            Party Name: {party.name}
          </Typography>
        ) : (
          <Typography color="error">Party not found</Typography>
        )}
      </Paper>

      {/* PARTY BILLS */}
      <Stack>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Party Bills
        </Typography>

        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <DarkStyledTableCell>Date</DarkStyledTableCell>
                  <DarkStyledTableCell>Bill Amount</DarkStyledTableCell>
                  <DarkStyledTableCell>Received</DarkStyledTableCell>
                  <DarkStyledTableCell>Pending</DarkStyledTableCell>
                  <DarkStyledTableCell>Payment</DarkStyledTableCell>
                  <DarkStyledTableCell>Status</DarkStyledTableCell>
                  <DarkStyledTableCell>Note</DarkStyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {partyBillsById.length > 0 ? (
                  partyBillsById.map((bill) => (
                    <StyledTableRow key={bill._id}>
                      <StyledTableCell>{new Date(bill.date).toLocaleDateString()}</StyledTableCell>
                      <StyledTableCell>
                        <Typography fontWeight="bold" color={primaryDarkColor}>
                          ₹{bill.bill_amount}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography fontWeight="bold" color={"green"}>
                          ₹{bill.received_amount}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography fontWeight="bold" color={"red"}>
                          ₹{bill.bill_amount - bill.received_amount}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell>
                        <AddPaymentModal label="Payments" partyId={id} bill={bill} />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography fontWeight="bold" color={bill.payment_status === "RECEIVED" ? "green" : "red"}>
                          {bill.payment_status}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>{bill.note || "-"}</StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={5} align="center">
                      No bills found
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* PAGINATION */}
          {pagination.totalPages > 1 && (
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Pagination
                count={pagination.totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                shape="rounded"
                size="large"
                variant="outlined"
                color="primary"
              />
            </Stack>
          )}
        </>
      </Stack>
    </Container>
  );
};

export default PartyDetails;
