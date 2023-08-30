import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PasswordInput } from "components/password/Password";
import { auth, changePassword, reAuthenticate } from "db/api/login";
import { updatePassword } from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
const ChangePassword = () => {
	const [errorMessage, setErrorMessage] = useState(null);

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
				setErrorMessage(null);
			} else {
				setErrorMessage("Contraseña incorrecta");
			}
		},
		validateOnChange: false,
		validationSchema: Yup.object({
			current_password: Yup.string().required("campo obligatorio"),
			new_password: Yup.string()
				.required("campo obligatorio")
				.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
					message: "La contraseña debe tener al menos 1 mayuscula, 1 minuscula y 1 numero ",
				}),
			confirm_password: Yup.string()
				.required("campo obligatorio")
				.oneOf([Yup.ref("new_password")], "Las contraseñas no coinciden"),
		}),
	});
	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "calc(100vh - 130px )",
			}}
		>
			<Grid
				container
				spacing={1}
				component="form"
				onSubmit={handleSubmit}
				sx={{
					width: { xs: "90%", sm: "50%", md: "40%" },
					backgroundColor: "background.paper",
					padding: "10px 20px",
					borderRadius: "20px",
				}}
			>
				<Grid xs={12} marginBottom={2} item>
					<Typography align="center" variant="h5" color="primary.main" fontWeight={"bolder"}>
						¿Quieres cambiar tu contraseña?
					</Typography>
				</Grid>
				<Grid xs={12} marginBottom={2} item>
					<PasswordInput
						label="Contraseña actual"
						name="current_password"
						onChange={handleChange}
						error={errors.current_password || errorMessage ? true : false}
						helpertext={errors.current_password}
					/>
				</Grid>
				<Grid xs={12} marginBottom={2} item>
					<PasswordInput
						label="Nueva contraseña"
						name="new_password"
						onChange={handleChange}
						error={errors.new_password ? true : false}
						helpertext={errors.new_password}
					/>
				</Grid>
				<Grid xs={12} marginBottom={2} item>
					<PasswordInput
						label="Confirmar contraseña"
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
					<Button
						variant="contained"
						type="submit"
						sx={{
							padding: "5px 10px",
						}}
					>
						Cambiar
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ChangePassword;
