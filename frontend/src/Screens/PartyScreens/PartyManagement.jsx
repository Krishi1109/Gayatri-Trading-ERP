import { Container, Stack, Typography } from "@mui/material";
import PartyModal from "./AddPartyModal";

const PartyManagement = () => {
  return (
    <Container maxWidth="xl">
      {/* Main Heading */}
      <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
        Party Management
      </Typography>
      <Stack>
        <PartyModal />
      </Stack>
    </Container>
  );
};

export default PartyManagement;
