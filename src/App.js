import React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import ThemeContextProvider from "./theme/ThemeContextProvider";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//comments
function App() {
	return (
			<StyledEngineProvider>
				<ThemeContextProvider>
					<BrowserRouter>
						<AppRouter />
						<ToastContainer />
					</BrowserRouter>
				</ThemeContextProvider>
			</StyledEngineProvider>
	);
}
export default App;
