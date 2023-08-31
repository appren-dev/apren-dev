import { createTheme } from "@mui/material";

export const baseTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#e2e2e2",
			secondary: "#20bac2",
		},
		secondary: {
			main: "#d0dedb",
			contrastText: "#25293C",
		},
		background: {
			default: "#25293C",
			paper: "#2F3349",
		},
		success: {
			main: "#20bac2",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					padding: 0,
				},
			},
		},
		MuiTypography:{
			styleOverrides:{
				root:{
					color: "#e2e2e2"
				}
			}
		}
	},
	typography: {
		fontFamily: ["Roboto", "Helvetica"].join(","),
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
