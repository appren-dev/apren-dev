import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PasswordInput } from "components/password/Password";
import { changePassword, reAuthenticate } from "db/api/login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "utilities/ToastsHelper";
import { useNavigate } from "react-router";
import { AuthContainer as ChangePasswordContainer, CustomButton, AuthBox as ChangePasswordBox  } from "styles/components/authcomponents";
import { lang } from "lang/config";

const ChangePassword = () => {
	const navigate = useNavigate();

	const { handleChange, handleSubmit, errors } = useFormik({
		initialValues: {
			current_password: "",
			new_password: "",
			confirm_password: "",
		},
		onSubmit: async (data) => {
			console.log(data);
			let res = await reAuthenticate(data.current_password);
			if (res.operationType === "reauthenticate") {
				await changePassword(data.new_password);
				Toast.success(lang.success_changePassword);
				navigate("/");
			} else {
				Toast.error(lang.incorrect_currentPassword);
			}
		},
		validateOnChange: false,
		validationSchema: Yup.object({
			current_password: Yup.string().required(lang.error_require),
			new_password: Yup.string()
				.required(lang.error_require)
				.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
					message: lang.error_regEx,
				}),
			confirm_password: Yup.string()
				.required(lang.error_require)
				.oneOf([Yup.ref("new_password")], lang.error_not_match),
		}),
	});
	return (
		<ChangePasswordContainer height="calc(100vh - 140px)">
			<ChangePasswordBox>
				<Grid container spacing={1} component="form" onSubmit={handleSubmit}>
					<Grid xs={12} marginBottom={4.5} item>
						<Typography align="center" variant="h5" fontWeight={"bolder"}>
							{lang.form_title_cp}
						</Typography>
					</Grid>
					<Grid xs={12} marginBottom={2} item>
						<PasswordInput
							label={lang.label_current}
							name="current_password"
							onChange={handleChange}
							error={errors.current_password ? true : false}
							helpertext={errors.current_password}
						/>
					</Grid>
					<Grid xs={12} marginBottom={2} item>
						<PasswordInput
							label={lang.label_new}
							name="new_password"
							onChange={handleChange}
							error={errors.new_password ? true : false}
							helpertext={errors.new_password}
						/>
					</Grid>
					<Grid xs={12} marginBottom={2} item>
						<PasswordInput
							label={lang.label_confirm}
							name="confirm_password"
							onChange={handleChange}
							error={errors.confirm_password ? true : false}
							helpertext={errors.confirm_password}
						/>
					</Grid>
					<Grid
						xs={12}
						marginBottom={2}
						item
						sx={{
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<CustomButton type="submit">{lang.btn_cp}</CustomButton>
					</Grid>
				</Grid>
			</ChangePasswordBox>
		</ChangePasswordContainer>
	);
};

export default ChangePassword;
