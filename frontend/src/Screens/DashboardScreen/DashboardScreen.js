import React, { useEffect, useState } from "react";
import PurchaseLineChart from "./Graphs/PurchaseLineChart";
import { Container, Stack, Box, Autocomplete, TextField, Typography } from "@mui/material";
import DisplayCard from "./DisplayCard";
import BrandPieChart from "./Graphs/BrandPieChart";
import { years } from "../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseAnalysisByStatus } from "../../apis/purchase";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(null);

  const { purchaseAnalysisByStatusData } = useSelector((state) => state.purchase);
  // dispatch(fetchPurchaseAnalysisByStatus(selectedYear));

  useEffect(() => {
    dispatch(fetchPurchaseAnalysisByStatus({ year: selectedYear }));
  }, [dispatch, selectedYear]);

  return (
    <Container>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Autocomplete
          id="year-autocomplete"
          size="small"
          sx={{ width: 200, my: 2 }}
          options={years}
          value={selectedYear}
          getOptionLabel={(option) => option.toString()}
          onChange={(event, newValue) => {
            setSelectedYear(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Select Year" variant="outlined" fullWidth />}
        />
        <Typography variant="h6">ADMIN PANEL</Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mb: 4,
          flexWrap: "wrap", // Enable wrapping
          gap: 2,
        }}
      >
        {purchaseAnalysisByStatusData ? (
          <>
            {purchaseAnalysisByStatusData.map((item, key) => (
              <DisplayCard key={key} mainHeading={item.status} year={selectedYear} amount={item.totalAmount} count={item.count} />
            ))}
          </>
        ) : (
          // Optionally, you can render something else when there's no data
          <p>No data available</p>
        )}
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
