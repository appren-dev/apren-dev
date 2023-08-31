import { Box, Grid, TextField, Typography, Checkbox } from "@mui/material";
import { CustomButton, GoogleButton } from "styles/components/authcomponents";
import CustomLoadingButton from "components/loadingButton";
import { PasswordInput } from "components/password/Password";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "./useLogin";
import { lang } from "lang/config";

const Login = () => {
	const {
		loading,
		credentials,
		handleChange,
		handleSubmit,
		invalidFields,
		setCredentials,
		handleGoogleSigning,
	} = useLogin();
	return (
		<Grid container spacing={1} component="form" onSubmit={(e) => handleSubmit(e)}>
			<Grid xs={12} marginBottom={2} item>
				<Typography variant="h4" fontWeight={"bolder"}>
					{lang.login_page_title}
				</Typography>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<TextField
					size="small"
					name="email"
					sx={{ width: "100%" }}
					onChange={handleChange}
					value={credentials.email}
					error={invalidFields?.email}
					label={lang.login_email_field}
				/>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				{credentials.showPassword ? (
					<PasswordInput
						name="password"
						onChange={handleChange}
						value={credentials.password}
						label={lang.login_pass_field}
						error={invalidFields?.password}
					/>
				) : (
					<TextField
						size="small"
						name="password"
						type="password"
						sx={{ width: "100%" }}
						onChange={handleChange}
						value={credentials.password}
						label={lang.login_pass_field}
						error={invalidFields?.password}
					/>
				)}
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Box>
						<Checkbox
							checked={credentials.rememberMe}
							onChange={() =>
								setCredentials((prevState) => ({ ...prevState, rememberMe: !prevState.rememberMe }))
							}
							sx={{
								color: "white",
								"&.Mui-checked": {
									color: "primary.secondary",
								},
							}}
						/>
						<Typography variant="caption" color="secondary">
							{lang.login_check_btn}
						</Typography>
					</Box>
					<Typography
						variant="caption"
						color="primary.secondary"
						sx={{
							cursor: "pointer",
							"&:hover": {
								textDecoration: "underline",
							},
						}}
					>
						{lang.login_forget_field}
					</Typography>
				</Box>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				{loading.credentialSigning ? (
					<CustomLoadingButton loadingMessage="Iniciando Sesión" />
				) : (
					<CustomButton type="submit">{lang.login_init_session.replace("con", "")}</CustomButton>
				)}
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<Box sx={{ width: "100%", border: "0.05px solid #e2e2e2" }} />
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				{loading.googleSigning.status ? (
					<CustomLoadingButton loadingMessage={loading.googleSigning.message} />
				) : (
					<GoogleButton type="button" onClick={handleGoogleSigning}>
						<FcGoogle size={47} />
						{lang.login_init_session} Google
					</GoogleButton>
				)}
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<Typography
					variant="subtitle"
					sx={{
						color: "primary.main",
						cursor: "pointer",
						"&:hover": {
							color: "primary.secondary",
							textDecoration: "underline",
						},
					}}
				>
					{lang.login_not_an_account_yet}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Login;
