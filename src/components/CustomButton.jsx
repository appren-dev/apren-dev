import { Typography } from "@mui/material";
import { CustomButton } from "styles/components/authcomponents";

const CustomeButton = ({ message, onClick }) => (
  <CustomButton>
    <Typography sx={{ fontSize: "20px", textTransform: "uppercase", fontWeight: 900 }} variant='subtitle1' color="white" >{message}</Typography>
  </CustomButton>
);

export default CustomeButton;