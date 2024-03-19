import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { GreenColor, RedColor, primaryMediumColor } from "../../shared/constants";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#22d3ee", // Cyan color
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const DarkStyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#155e75", // Cyan color
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Function to get status color
export const getStatusColor = (status) => {
  switch (status) {
    case "ACTIVE":
      return GreenColor; // Green color for ACTIVE
    case "INACTIVE":
      return RedColor; // Red color for INACTIVE
    case "COMPLETED":
      return primaryMediumColor; // Blue color for COMPLETED
    default:
      return "#000000"; // Default color
  }
};
