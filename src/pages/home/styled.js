import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const StyledBox = styled(Box)`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(435px, 1fr));
	gap: 20px;
`;

export { StyledBox };
