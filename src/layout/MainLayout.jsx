import { outletContainer } from "styles/objects/mainLayout";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { Fragment } from "react";
import Navbar from "./Navbar";

const MainLayout = () => (
  <Fragment>
    <Navbar />
    <Box sx={outletContainer}>
      <Outlet />
    </Box>
  </Fragment>
);

export default MainLayout;