import { GreenColor, RedColor, primaryMediumColor } from "../../shared/constants";

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
