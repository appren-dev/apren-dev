import { AuthContainer, AuthBox } from "styles/components/authcomponents";
import { Box, Typography } from "@mui/material";
import logo from "assets/apren-dev_logo_no_bg.png";
import { Outlet, useNavigate } from "react-router";

const AuthenticationLayout = () => {
	const navigate = useNavigate();

	return (
		<>
			<Box
				sx={{
					display: { xs: "none", md: "flex" },
					justifyContent: "space-between",
					width: "100%",
					height: "100vh",
				}}
			>
				<Box onClick={() => navigate("/")} sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "70%" }}>
					<img
						src={logo}
						alt="apren-dev"
						style={{
							width: "500px",
							height: "500px"
						}}
					/>
				</Box>
				<AuthBox>
					<Outlet />
				</AuthBox>
			</Box>
			<Box sx={{ display: { xs: "block", md: "none" } }}>
				<AuthContainer component="div" height="100vh">
					<Box component="header" marginTop={4.5}>
						<img
							src={logo}
							alt="apren-dev"
							style={{
								height: "150px",
								width: "150px",
							}}
						/>
					</Box>
					<AuthBox>
						<Outlet />
					</AuthBox>
					<Box component="footer">
						<Typography color="primary.secondary" variant="h6">
							@pren-dev
						</Typography>
					</Box>
				</AuthContainer>
			</Box>
		</>
	);
};

export default AuthenticationLayout;
