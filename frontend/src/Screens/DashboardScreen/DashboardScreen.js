import React, { useEffect, useState } from "react";
import PurchaseLineChart from "./Graphs/PurchaseLineChart";
import { Container, Stack, Box, Autocomplete, TextField, Typography } from "@mui/material";
import DisplayCard from "./DisplayCard";
import BrandPieChart from "./Graphs/BrandPieChart";
import { years } from "../../shared/constants";

const DashboardScreen = () => {
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (selectedYear) {
      // Call your API here using the selectedYear value
      console.log(`API called with year: ${selectedYear}`);
    }
  }, [selectedYear]);
  return (
    <Container>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Autocomplete
          id="year-autocomplete"
          size="small"
          sx={{ width: 200, my: 2 }}
          options={years}
          value={selectedYear}
          onChange={(event, newValue) => {
            setSelectedYear(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Select Year" variant="outlined" fullWidth />}
        />
        <Typography variant="h6" >ADMIN PANEL</Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent={"space-between"} sx={{ mb: 4 }}>
        <DisplayCard mainHeading={"All Orders"} year={selectedYear} />
        <DisplayCard mainHeading={"Active Orders"} year={selectedYear} />
        <DisplayCard mainHeading={"Pending Orders"} year={selectedYear} />
        <DisplayCard mainHeading={"Completed Orders"} year={selectedYear} />
      </Stack>
      <Stack direction={"row"} width="100%" alignItems="center">
        <Box width="70%">
          <PurchaseLineChart />
        </Box>
        <Box width="30%">
          <BrandPieChart />
        </Box>
      </Stack>
    </Container>
  );
};

export default DashboardScreen;
