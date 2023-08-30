import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { OutlinedInput } from "@mui/material";

export const PasswordInput = (props) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<FormControl fullWidth variant="outlined">
			<InputLabel size={"small"} htmlFor="outlined-adornment-password">
				{props.label}
			</InputLabel>
			<OutlinedInput
				id="outlined-adornment-password"
				name="password"
				{...props}
				size="small"
				type={showPassword ? "text" : "password"}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label="Password"
			/>
		</FormControl>
	);
};
