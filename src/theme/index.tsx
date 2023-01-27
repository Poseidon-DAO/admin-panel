import { type ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import shadows from "./shadows";

export const theme = createTheme({
  palette,
  typography,
  shadows,
  shape: { borderRadius: 8 },
});

theme.components = componentsOverride(theme);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
