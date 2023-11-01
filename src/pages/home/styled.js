import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const StyledBox = styled(Box)`
	display: flex;
	gap: 51px;
	flex-wrap: wrap;
	justify-content: space-between;
	@media only screen and (max-width: 1543px) {
		justify-content: center;
	}
`;

export { StyledBox };
