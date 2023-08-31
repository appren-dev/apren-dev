import { styled } from "@mui/material";
import { Box} from "@mui/material";
export const ChangePasswordContainer = styled(Box)`
	width: 100%;
	height: calc(100vh - 140px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 25px;
`;
export const ChangePasswordBox = styled(Box)`
	min-width: 400px;
	max-width: 500px;
	border: 1px solid #2f3349;
	background-color: #2f3349;
	border-radius: 5px;
	color: #2f3349;
	padding: 30px 30px 10px 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`;