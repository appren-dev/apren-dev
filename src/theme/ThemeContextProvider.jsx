import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { baseTheme } from "./baseTheme";

const ThemeContext = React.createContext({});

const ThemeContextProvider = ({ children }) => {
 

  return (
    <ThemeContext.Provider value={{
      toggleColorMode: () => {
        return "dark"
      },
    }}>
      <ThemeProvider theme={baseTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );

};

export default ThemeContextProvider;