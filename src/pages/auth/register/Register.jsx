import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { CustomButton /* GoogleButton */ } from "styles/components/authcomponents";
/* import CustomLoadingButton from "components/loadingButton"; */
import { PasswordInput } from "components/password/Password";
import { useRegister } from "./useRegister";
/* import { FcGoogle } from "react-icons/fc"; */

const Register = () => {
	const { credentialsRegister, /*loading */ handleChange, handleSubmit, invalidFields /*handleGoogleSigning */ } =
		useRegister();

	return (
		<Grid container spacing={1} component="form" onSubmit={(e) => handleSubmit(e)}>
			<Grid xs={12} marginBottom={2} item>
				<Typography variant="h4" color="primary.main" fontWeight={"bolder"}>
					Sign Up
				</Typography>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<TextField
					size="small"
					name="name"
					label="Name"
					sx={{ width: "100%" }}
					onChange={handleChange}
					value={credentialsRegister.name}
					error={invalidFields?.name}
				/>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<TextField
					size="small"
					name="email"
					label="Email"
					sx={{ width: "100%" }}
					onChange={handleChange}
					value={credentialsRegister.email}
					error={invalidFields?.email}
				/>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<PasswordInput
					name="password"
					label="Contraseña"
					onChange={handleChange}
					value={credentialsRegister.password}
					error={invalidFields?.password}
				/>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<PasswordInput
					name="repeatPassword"
					label="Confirmar Contraseña"
					onChange={handleChange}
					value={credentialsRegister.repeatPassword}
					error={invalidFields?.repeatPassword}
				/>
			</Grid>

			<Grid xs={12} marginBottom={2} item>
				{/* {loading.credentialSigning ? (
					<CustomLoadingButton loadingMessage="Iniciando Sesión" />
				) : (
					<CustomButton type="submit">Iniciar sesión</CustomButton>
				)} */}
				<CustomButton type="submit">Registrarme</CustomButton>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<Box sx={{ width: "100%", border: "0.05px solid #e2e2e2" }} />
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				{/* 	{loading.googleSigning.status ? (
					<CustomLoadingButton loadingMessage={loading.googleSigning.message} />
				) : (
					<GoogleButton type="button" onClick={handleGoogleSigning}>
						<FcGoogle size={50} />
						Iniciar sesión con Google
					</GoogleButton>
				)} */}
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
					¿Ya tienes cuenta?
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Register;
