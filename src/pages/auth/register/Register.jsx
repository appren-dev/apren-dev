import { Box, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { CustomButton, GoogleButton } from "styles/components/authcomponents";
import { PasswordInput } from "components/password/Password";
import { useRegister } from "./useRegister";
import { lang } from "lang/config";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "../login/useLogin";
import CustomLoadingButton from "components/loadingButton";
import { Link } from "react-router-dom";

const Register = () => {
	const {
		handleSubmitRegistration,
		initialValues,
		getValidationSchema,
	} = useRegister();

	const { handleGoogleSigning, loading } = useLogin();

	const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
		validateOnBlur: true,

		validateOnChange: false,

		initialValues,

		validationSchema: getValidationSchema(),

		onSubmit: (data) => handleSubmitRegistration(data),
	});


	return (
		<Grid container spacing={1} component="form" onSubmit={handleSubmit}>
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
					onBlur={handleBlur}
					value={values.name}
					error={errors.name && touched.name ? true : false}
					helperText={errors.name && touched.name ? errors.name : ""}
				/>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<TextField
					size="small"
					name="email"
					label="Email"
					sx={{ width: "100%" }}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.email}
					error={errors.email && touched.email ? true : false}
					helperText={errors.email && touched.email ? errors.email : ""}
				/>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<PasswordInput
					name="password"
					label="Contraseña"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.password}
					error={errors.password && touched.password ? true : false}
				/>
				<FormHelperText sx={{ color: "#f44336", pl: "15px" }}>
					{errors.password && touched.password ? errors.password : ""}
				</FormHelperText>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<PasswordInput
					name="repeatPassword"
					label="Confirmar Contraseña"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.repeatPassword}
					error={errors.repeatPassword && touched.repeatPassword ? true : false}
				/>
				<FormHelperText sx={{ color: "#f44336", pl: "15px" }}>
					{errors.repeatPassword && touched.repeatPassword ? errors.repeatPassword : ""}
				</FormHelperText>
			</Grid>

			<Grid xs={12} marginBottom={2} item>
				<CustomButton type="submit">{lang.registration_btn_title}</CustomButton>
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<Box sx={{ width: "100%", border: "0.05px solid #e2e2e2" }} />
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				{loading.googleSigning.status ? (
					<CustomLoadingButton loadingMessage={loading.googleSigning.message} />
				) : (
					<GoogleButton
					gap={2}
						type="button"
						onClick={() => handleGoogleSigning("/authentication/registration")}
					>
						<FcGoogle size={40} />
						Iniciar sesión con Google
					</GoogleButton>
				)}
			</Grid>
			<Grid xs={12} marginBottom={2} item>
				<Link to="/authentication/login" style={{ textDecoration: "none" }}>
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
						{lang.registration_account_yet}
					</Typography>
				</Link>
			</Grid>
		</Grid>
	);
};

export default Register;
