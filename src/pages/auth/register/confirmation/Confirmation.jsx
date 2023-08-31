import { Box, Typography } from "@mui/material";
import { registrationDB } from "db/api/registration";
import { lang } from "lang/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Confirmation = () => {
	let navigate = useNavigate();
  
	const [status, setStatus] = useState(lang.confirmation_message_send);

	useEffect(() => {
		const location = window.location.search;
		if (location.includes("oobCode")) {
			const user = JSON.parse(localStorage.getItem("user_reg"));
			if (user) {
				const registrationUser = async () => {
					try {
						setStatus(lang.confirmation_message_confirm);
						await registrationDB(user);
						localStorage.removeItem("user_reg");
						setTimeout(() => {
							return navigate("/authentication/login");
						}, 2500);
					} catch (err) {
						setStatus(lang.confirmation_failed);
					}
				};
				registrationUser();
			} else {
				setStatus(lang.confirmation_expired);
			}
		} else {
			setStatus(lang.confirmation_message_send);
		}
	}, []);

	return (
		<Box sx={{ p: 2, pb: 4 }}>
			<Typography>{status}</Typography>
		</Box>
	);
};

export default Confirmation;
