import { Button, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography, Pagination, TextField } from "@mui/material";
import { DarkStyledTableCell, StyledTableCell, StyledTableRow } from "../../shared/TableStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchParties } from "../../apis/party";
import { CyanOutlineButton } from "../../shared/sharedStyles";
import { useNavigate } from "react-router-dom";

const PartyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { partyList, pagination } = useSelector((state) => state.parties);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // SAFE DEFAULTS
  const limit = pagination?.limit || 10;
  const totalPages = pagination?.totalPages || 1;

  useEffect(() => {
    dispatch(fetchParties({ page, limit, search }));
  }, [dispatch, page, search, limit]);

  const handleOnSubmit = (id) => {
    navigate(`/party_details/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      {/* 🔍 Search */}
      <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
        <TextField size="small" placeholder="Search by name or code" value={search} onChange={handleSearchChange} />
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <DarkStyledTableCell>Name</DarkStyledTableCell>
              <DarkStyledTableCell>Code</DarkStyledTableCell>
              <DarkStyledTableCell>Amount</DarkStyledTableCell>
              <DarkStyledTableCell>Pending Bills</DarkStyledTableCell>
              <DarkStyledTableCell>Details</DarkStyledTableCell>
              <DarkStyledTableCell>Actions</DarkStyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {partyList.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>
                  <Typography fontWeight="bold">{item.name}</Typography>
                </StyledTableCell>

                <StyledTableCell>{item.code}</StyledTableCell>
                <StyledTableCell>{item.amount}</StyledTableCell>
                <StyledTableCell>2</StyledTableCell>

                <StyledTableCell>
                  <CyanOutlineButton variant="outlined" onClick={() => handleOnSubmit(item._id)}>
                    Bills
                  </CyanOutlineButton>
                </StyledTableCell>

                <StyledTableCell>
                  <Button sx={{ px: 0 }}>
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📄 Pagination */}
      <Stack alignItems="center" sx={{ my: 2 }}>
        <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} color="primary" />
      </Stack>
    </>
  );
};

export default PartyList;
