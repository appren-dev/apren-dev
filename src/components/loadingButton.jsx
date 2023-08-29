import React from "react";
import { Typography } from "@mui/material";
import { LoadingButton } from "styles/components/authcomponents";
import { Ripples } from "@uiball/loaders";

const CustomLoadingButton = ({ loadingMessage, color }) => {
  return (
    <LoadingButton>
      <Typography sx={{ fontSize: "20px" }} variant='subtitle1' color="white" >{loadingMessage}</Typography>
      <Ripples
        size={45}
        speed={2}
        color={color || "white"}
      />
    </LoadingButton>
  );
};

export default CustomLoadingButton;