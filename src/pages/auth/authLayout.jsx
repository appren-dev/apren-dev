import React from "react";
import { AuthContainer, AuthBox } from "styles/components/authcomponents";
import { Box, Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import logo from "assets/apren-dev_logo_no_bg.png";
import { Outlet } from "react-router";

const AuthenticationLayout = () => {
  return (
    <AuthContainer component="div">
      <Box component="header" marginTop={4.5}>
        <CardMedia
          image={logo}
          title="apren-dev"
          sx={{
            height: "100px",
            width: "100px"
          }}
        />
      </Box>
      <AuthBox>
        <Outlet />
      </AuthBox>
      <Box component="footer">
        <Typography color="primary.secondary" variant="h6">@pren-dev</Typography>
      </Box>
    </AuthContainer>
  );
};

export default AuthenticationLayout;