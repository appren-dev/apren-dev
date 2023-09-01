import { Grid, TextField, Typography } from "@mui/material";
import { onSendEmailLink, onSingInWithEmailLink } from "db/api/login";
import { useFormik } from "formik";
import { lang } from "lang/config";
//import { useEffect } from "react";
import { CustomButton } from "styles/components/authcomponents";
import { Toast } from "utilities/ToastsHelper";
import { errorHandler } from "utilities/errorHandler";
//import * as Yup from "yup";
const ForgotPassword = () => {
	const location = window.location.search.includes("signIn&oobCode");

	const { handleSubmit, handleChange, errors } = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		onSubmit: async (data) => {
			if (location) {
				try {
					console.log("Entró");
					await onSingInWithEmailLink(data.password);
				} catch (error) {
					console.log("Kz: 🏈 ~ onSubmit: ~ error:", error);
					const errorMessage = errorHandler(error);
					return Toast.error(errorMessage);
				}
			} else {
				try {
					const res = await onSendEmailLink(data.email);
					if (res.status === "success") {
						console.log("todo bien");
					} else {
						console.log(res);
					}
				} catch (error) {
					console.log("Kz: 🏈 ~ onSubmit: ~ error:", error);
					const errorMessage = errorHandler(error);
					return Toast.error(errorMessage);
				}
			}
		},
		validateOnChange: false,
	});

	return (
		<Grid container spacing={1} component="form" onSubmit={handleSubmit}>
			<Grid xs={12} marginBottom={2} item>
				<Typography variant="h4" fontWeight={"bolder"}>
					{lang.title_forgot_pass}
				</Typography>
			</Grid>
			{location ? (
				<Grid xs={12} marginBottom={2} item>
					<TextField
						size="small"
						name="password"
						sx={{ width: "100%" }}
						onChange={handleChange}
					// value={credentials.email}
					// error={errors.email ? true : false}
					// label={lang.forgot_input_label}
					// helperText={errors.email}
					/>
				</Grid>
			) : (
				<Grid xs={12} marginBottom={2} item>
					<TextField
						size="small"
						name="email"
						sx={{ width: "100%" }}
						onChange={handleChange}
						// value={credentials.email}
						error={errors.email ? true : false}
						label={lang.forgot_input_label}
						helperText={errors.email}
					/>
				</Grid>
			)}
			<Grid xs={12} marginBottom={2} item sx={{ display: "flex", justifyContent: "center" }}>
				{
					location ? (
						<CustomButton type="submit">Guardar Contraseña</CustomButton>
					) : (
						<CustomButton type="submit">{lang.btn_forgot_pass}</CustomButton>
					)
				}
			</Grid>
		</Grid>
	);
};

export default ForgotPassword;
