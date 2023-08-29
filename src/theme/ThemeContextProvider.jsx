import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { baseTheme } from "./baseTheme";

const ThemeContext = React.createContext({});

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => createTheme(baseTheme), [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(() => ("light"));
      },
    }),
    [],
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );

};

export default ThemeContextProvider;