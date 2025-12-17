import { Container, Stack, Typography } from "@mui/material";
import PartyModal from "./AddPartyModal";
import PartyList from "./PartyList";

const PartyManagement = () => {
  return (
    <Container maxWidth="xl">
      {/* Main Heading */}

      <Stack direction={"row"} justifyContent={"space-between"}>
        <PartyModal />
        <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
          Party Management
        </Typography>
        <PartyModal />
      </Stack>
      <Stack sx={{ py: 1 }}>
        <PartyList />
      </Stack>
    </Container>
  );
};

export default PartyManagement;
