import { Box, Grid, TextField, Typography } from "@mui/material";
import { onSendEmailLink, onSingInWithEmailLink } from "db/api/login";
import { useFormik } from "formik";
import { lang } from "lang/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, GoogleButton } from "styles/components/authcomponents";
import * as Yup from "yup";
const ForgotPassword = () => {
	const location = window.location.search.includes("signIn&oobCode");
	const [phrase, setPhrase] = useState({
		text: lang.title_forgot_pass,
		status: "idle",
	});

	const schema = () => {
		if (location) {
			return Yup.object({
				password: Yup.string().required("Campo requeridosss"),
			});
		} else {
			return Yup.object({
				email: Yup.string().required("Campo requeridossss"),
			});
		}
	};

	const navigate = useNavigate();

	const { handleSubmit, handleChange, errors } = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: async (data) => {
			if (location) {
				await onSingInWithEmailLink(data.password);

				setPhrase({
					text: "Se cambió la contraseña exitosamente!",
					status: "success",
				});
				setTimeout(() => {
					return navigate("/authentication/login");
				}, 2500);
			} else {
				await onSendEmailLink(data.email);

				setPhrase({
					text: "Hemos enviado un correo para recuperar tu contraseña",
					status: "loading",
				});
			}
		},
		validateOnChange: false,
		validationSchema: schema(),
	});

	return (
		<Grid container spacing={1} component="form" onSubmit={handleSubmit}>
			<Grid xs={12} marginBottom={2} item>
				<Typography variant="h4" fontWeight={"bolder"}>
					{phrase.text}
				</Typography>
			</Grid>
			{location && phrase.status === "idle" && (
				<Grid xs={12} marginBottom={2} item>
					<TextField
						label="Contraseña"
						size="small"
						name="password"
						sx={{ width: "100%" }}
						onChange={handleChange}
						error={errors.password ? true : false}
						helperText={errors.password}
					/>
				</Grid>
			)}
			{phrase.status === "idle" && !location && (
				<Grid xs={12} marginBottom={2} item>
					<TextField
						size="small"
						name="email"
						sx={{ width: "100%" }}
						onChange={handleChange}
						label={lang.forgot_input_label}
						error={errors.email ? true : false}
						helperText={errors.email}
					/>
				</Grid>
			)}

			<Grid xs={12} marginBottom={2} item sx={{ display: "flex", justifyContent: "center" }}>
				{location && phrase.status === "idle" && (
					<CustomButton type="submit">Guardar Contraseña</CustomButton>
				)}

				{phrase.status === "idle" && !location && (
					<Box
						sx={{
							width: "100%",
							flexDirection: "column",
						}}
					>
						<CustomButton sx={{ marginBottom: "16px" }} type="submit" fullWidth>
							{lang.btn_forgot_pass}
						</CustomButton>
						<GoogleButton
							fontSize={20}
							type="button"
							onClick={() => navigate("/authentication/login")}
						>
							Regresar
						</GoogleButton>
					</Box>
				)}
			</Grid>
		</Grid>
	);
};

export default ForgotPassword;
