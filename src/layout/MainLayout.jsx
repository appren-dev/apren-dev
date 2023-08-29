import React, { Fragment } from "react";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Box sx={{ padding: { xs: "52px 20px 10px 20px", sm: "52px 25px 10px 30px" } }}>
        <Outlet />
      </Box>
    </Fragment>
  );
};

export default MainLayout;