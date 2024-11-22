import { Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const DisplayCard = ({ mainHeading, year, amount, count }) => {
  return (
    <div>
      <Card sx={{ backgroundColor: "#e8f5e9", minWidth: 275, border: "2px solid #33691e", boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Purchase
          </Typography>
          <Typography variant="h5" component="div">
            {mainHeading}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            <TrendingUpIcon sx={{ fontSize: 16, color: "#4caf50", verticalAlign: "middle", marginRight: 1 }} />
            {year ? year : "Overall"} {count}
          </Typography>
          <Typography variant="h6" sx={{ color: "#4caf50", fontWeight: 600 }}>
            {amount}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default DisplayCard;
