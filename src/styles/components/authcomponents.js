import { styled } from "@mui/material";
import { Box, Button } from "@mui/material";

const AuthContainer = styled(Box)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 25px;
`;

const AuthBox = styled(Box)`
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

const CustomButton = styled(Button)`
	text-transform: unset;
	width: 100%;
	background-color: #147479;
	border: none;
	padding: 12px;
	color: #2f3349;
	letter-spacing: 1px;
	border-radius: 50px;
	cursor: pointer;
	font-size: 20px;
	&:hover {
		font-weight: bolder;
		background-color: #20bac2;
	}
`;

const GoogleButton = styled(Box)`
	text-transform: unset;
	border: none;
	width: 100%;
	padding: 7px;
	display: flex;
	color: #2f3349;
	border-radius: 50px;
	letter-spacing: 1px;
	background-color: white;
	justify-content: center;
	align-items: center;
	gap: 20px;
	cursor: pointer;
	&:hover {
		border: 1px solid #20bac2;
		padding: 6px;
	}
`;

const LoadingButton = styled(Box)`
	text-transform: capitalize;
	width: 100%;
	background-color: ${(props) => (props.color ? props.color : "#20bac2")};
	border: none;
	padding: 7px;
	color: #2f3349;
	letter-spacing: 1px;
	border-radius: 50px;
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

export { AuthContainer, AuthBox, CustomButton, GoogleButton, LoadingButton };
