import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUserTheme } from "../../store/userSlice";

export function AppTheme(props: { children: React.ReactNode }): JSX.Element {
    let themeName = useAppSelector(selectUserTheme);
    if (themeName === 'None') {
        themeName = 'Dark';
    }

    const theme = createMuiTheme({
        palette: {
            type: themeName === 'Light' ? 'light' : 'dark',
            primary: {
                main: '#1b5e20',
            },
            secondary: {
                main: '#0d47a1',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
}
