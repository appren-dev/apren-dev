import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const baseTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#2a3eb1",
			//color: "rgba(51, 48, 60, 0.87)",
		},
		secondary: {
			main: "#f50057",
			//color: "rgba(51, 48, 60, 0.87)",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					padding: "3px 9px",
					backgroundColor: red[800],
					fontFamily: ["Roboto", "'Press Start 2P', cursive"].join(","),
					"&:hover": {
						backgroundColor: red["A700"],
					},
				},
			},
		},
	},
	typography: {
		fontFamily: ["Roboto", "Helvetica"].join(","),
		color: "rgba(51, 48, 60, 0.87)",
		h1: {
			fontFamily: ["Roboto", "'Press Start 2P', cursive"].join(","),
			fontSize: 36,
		},
	},
	breakpoints: {
		values: {
			xs: 300,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
});
