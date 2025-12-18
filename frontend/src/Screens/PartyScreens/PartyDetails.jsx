import { Typography, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { primaryDarkColor, primaryLightColor } from "../../shared/constants";

const PartyDetails = () => {
  const { id } = useParams();
  const { partyList } = useSelector((state) => state.parties);

  const party = partyList.find((p) => p._id === id);

  return (
    <Paper sx={{ p: 3 }}>
      {party ? (
        <Typography variant="h6" sx={{ color: primaryDarkColor }} fontWeight="bold">
          Party Name: {party.name}
        </Typography>
      ) : (
        <Typography color="error">Party not found</Typography>
      )}

      
    </Paper>
  );
};

export default PartyDetails;
