import { Grid, TextField, Typography } from "@mui/material";
import { changePassword, forgotPassword } from "db/api/login";
import { useFormik } from "formik";
import { lang } from "lang/config";
import { useEffect } from "react";
import { CustomButton } from "styles/components/authcomponents";
import * as Yup from "yup";
const ForgotPassword = () => {
	const location = window.location.search.includes("signIn&oobCode");
	console.log(location);

	const { handleSubmit, handleChange, errors } = useFormik({
		initialValues: {
			email: "",
			password:""
		},
		onSubmit: async (data) => {
			if(location){
				await changePassword(data.password)
			}else{
				await forgotPassword(data.email);
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
				<CustomButton type="submit">{lang.btn_forgot_pass}</CustomButton>
			</Grid>
		</Grid>
	);
};

export default ForgotPassword;
