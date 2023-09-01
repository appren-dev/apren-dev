import { Grid, TextField, Typography } from "@mui/material";
import { forgotPassword } from "db/api/login";
import { useFormik } from "formik";
import { lang } from "lang/config";
import { CustomButton } from "styles/components/authcomponents";
import * as Yup from "yup"
const ForgotPassword = () => {

	const {handleSubmit, handleChange, errors} = useFormik({
		initialValues:{
			email:""
		},
		onSubmit: async (data)=>{
			await forgotPassword(data.email)
		},
		validateOnChange: false,
		validationSchema: Yup.object({
			email: Yup.string().required(lang.error_forgot_email_input)
		})
	})

	return (
		<Grid container spacing={1} component="form" onSubmit={handleSubmit}>
			<Grid xs={12} marginBottom={2} item>
				<Typography variant="h4" fontWeight={"bolder"}>
					{lang.title_forgot_pass}
				</Typography>
			</Grid>
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
			<Grid xs={12} marginBottom={2} item sx={{display:"flex", justifyContent: "center"}}>

			<CustomButton type="submit">{lang.btn_forgot_pass}</CustomButton>
			</Grid>
		</Grid>
	);
};

export default ForgotPassword;
