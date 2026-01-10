import { Typography, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Container, Pagination, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DarkStyledTableCell, StyledTableCell, StyledTableRow } from "../../shared/TableStyles";
import { primaryDarkColor } from "../../shared/constants";
import { fetchPartyTransactionsByPartyId } from "../../apis/partyTransaction";
import { ApiStates } from "../../shared/constants";

const PartyTransactions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { partyList } = useSelector((state) => state.parties);
  const { partyTransactionsById = [], fetchPartyTransactionsApiStatus, pagination, summary } = useSelector((state) => state.partyTransactions);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const party = partyList.find((p) => p._id === id);

  // 🔹 Fetch transactions
  useEffect(() => {
    if (id) {
      dispatch(
        fetchPartyTransactionsByPartyId({
          partyId: id,
          page,
          limit: 10,
          search,
          startDate,
          endDate,
        })
      );
    }
  }, [dispatch, id, page, search, startDate, endDate]);

  // 🔹 Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, startDate, endDate]);

  return (
    <Container maxWidth="xl">
      {/* PARTY HEADER */}
      <Paper sx={{ p: 2, mb: 3 }}>
        {party ? (
          <>
            <Typography variant="h6" fontWeight="bold" sx={{ color: primaryDarkColor }}>
              Party Name: {party.name}
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Total Transaction Amount: <strong>₹{summary?.totalAmount || 0}</strong>
            </Typography>
          </>
        ) : (
          <Typography color="error">Party not found</Typography>
        )}
      </Paper>

      {/* FILTERS */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField label="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Note / Module" fullWidth />

          <TextField
            label="Start Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
          />

          <TextField
            label="End Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
          />

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSearch("");
              setStartDate("");
              setEndDate("");
            }}
          >
            Clear
          </Button>
        </Stack>
      </Paper>

      {/* PARTY TRANSACTIONS */}
      <Stack>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Party Transactions
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <DarkStyledTableCell>Date</DarkStyledTableCell>
                <DarkStyledTableCell>Amount</DarkStyledTableCell>
                <DarkStyledTableCell>Module</DarkStyledTableCell>
                <DarkStyledTableCell>Note</DarkStyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {fetchPartyTransactionsApiStatus === ApiStates.LOADING ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={4} align="center">
                    Loading...
                  </StyledTableCell>
                </StyledTableRow>
              ) : partyTransactionsById.length > 0 ? (
                partyTransactionsById.map((txn) => (
                  <StyledTableRow key={txn._id}>
                    <StyledTableCell>{new Date(txn.date).toLocaleDateString()}</StyledTableCell>

                    {/* 🔴 Conditional color for Amount */}
                    <StyledTableCell>
                      <Typography
                        fontWeight="bold"
                        color={txn.amount >= 0 ? "green" : "red"} // ✅ Positive green, negative red
                      >
                        ₹{txn.amount}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>{txn.transaction_module || "-"}</StyledTableCell>
                    <StyledTableCell>{txn.note || "-"}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={4} align="center">
                    No transactions found
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION */}
        {pagination?.totalPages > 1 && (
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
      </Stack>
    </Container>
  );
};

export default PartyTransactions;
