import { Box, Typography } from "@mui/material";
import { primaryMediumColor } from "./constants";

const SmoothDivider = () => {
  return (
    <Box
      sx={{
        my: 3,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: primaryMediumColor,
          display: "inline-block",
          fontWeight: "bold",
          letterSpacing: "3px",
          fontFamily: "'Poppins', sans-serif",
          animation: "pulse 2.2s ease-in-out infinite",
          "@keyframes pulse": {
            "0%": { letterSpacing: "2px", opacity: 0.8 },
            "50%": { letterSpacing: "4px", opacity: 1 },
            "100%": { letterSpacing: "2px", opacity: 0.8 },
          },
        }}
      >
        GAYATRI TRADING
      </Typography>
    </Box>
  );
};

export default SmoothDivider;
