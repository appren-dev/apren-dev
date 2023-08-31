import { Typography } from "@mui/material";
import { registrationDB } from "db/api/registration";
import { lang } from "lang/config";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { errorHandler } from "utilities/errorHandler";

const Confirmation = () => {
	let navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const paramValue = queryParams.get("oobCode");
	let user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		if (paramValue) {
			if (user) {
				const registrationUser = async () => {
					try {
						await registrationDB(user);
						localStorage.removeItem("user");
						navigate("/authentication/login");
					} catch (err) {
						return errorHandler;
					}
				};
				registrationUser();
			}
		}
	}, [paramValue]);

	return (
		<div>
			{paramValue ? (
				<Typography>{lang.confirmation_message_confirm}</Typography>
			) : (
				<Typography>{lang.confirmation_message_send}</Typography>
			)}
		</div>
	);
};

export default Confirmation;
