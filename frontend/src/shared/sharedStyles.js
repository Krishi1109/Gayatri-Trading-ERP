import { Button, darken } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  primaryDarkColor,
  primaryLightColor,
  primaryMediumColor,
} from "./constants";

export const CyanFillButton = styled(Button)(({ theme }) => ({
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
  textTransform: "none",
  // borderRadius: ShBorderRadius,
  width: "fit-content",
  "&.self-center": {
    alignSelf: "center",
  },
  "&.self-right": {
    alignSelf: "flex-end",
  },
  "&:not(.Mui-disabled)": {
    backgroundColor: primaryMediumColor,
    color: "white",
  },
  "&:hover": {
    // darken function from @mui. Takes in a color and value to darken the given color.
    backgroundColor: darken(primaryMediumColor, 0.1),
  },
}));

export const CyanOutlineButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  width: "fit-content",
  minWidth: "unset",
  color: primaryMediumColor, // Set text color to primary medium color
  borderColor: primaryLightColor, // Set border color to primary light color
  fontWeight: "bold",
  "&.MuiButton-text": {
    textDecoration: "none",
  },
  "&.MuiButton-outlined": {
    paddingTop: 0,
    paddingBottom: 0,
    borderColor: primaryLightColor, // Set border color to primary light color
    color: primaryMediumColor, // Set text color to primary medium color
    "&:hover": {
      borderColor: primaryDarkColor, // Set border color to primary dark color on hover
    },
  },
}));
