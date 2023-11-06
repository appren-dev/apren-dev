import { styled } from "@mui/material";
import { Box, Button } from "@mui/material";

const AuthContainer = styled(Box)`
	width: 100%;
	height: ${(props) => props.height};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 25px;
	padding: 0 20px;
`;

const AuthBox = styled(Box)`
	min-width: 350px;
	max-width: 700px;
	width: 30%;
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
	height: 45px;
	background-color: #147479;
	border: none;
	padding: 5px 10px;
	color: #fff;
	letter-spacing: 1px;
	border-radius: 7px;
	cursor: pointer;
	font-size: 20px;
	transition: background-color 0.5s ease;
	&:hover {
		font-weight: bolder;
		background-color: #20bac2;
	}
`;

const GoogleButton = styled(Box)`
	text-transform: unset;
	border: none;
	width: 100%;
	padding: 5px 10px;
	height: 45px;
	display: flex;
	color: #2f3349;
	border-radius: 7px;
	letter-spacing: 1px;
	background-color: white;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: background-color 0.5s ease, color 0.5s ease;
	&:hover {
		background-color: #147479;
		color: #fff;
	}
`;

const LoadingButton = styled(Box)`
	text-transform: capitalize;
	width: 100%;
	height: 45px;
	background-color: ${(props) => (props.color ? props.color : "#20bac2")};
	border: none;
	padding: 5px 10px;
	color: #2f3349;
	letter-spacing: 1px;
	border-radius: 7px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export { AuthContainer, AuthBox, CustomButton, GoogleButton, LoadingButton };
