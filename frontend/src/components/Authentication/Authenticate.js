import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Authenticate = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth === true ? (
    <Box sx={{ my: 2, mb: 8 }}>
      <Outlet />
    </Box>
  ) : (
    <Navigate to="/" />
  );
};

export default Authenticate;
