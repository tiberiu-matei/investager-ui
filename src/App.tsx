import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import { Home } from "./components/global/Home";
import { Snackbar as InvestagerSnackbar } from "./components/global/Snackbar";
import { Login, Register } from "./components/user";
import { LocalStorageKeys } from "./models/localStorageKeys";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectUserLogged, setUserDetails } from "./store/userSlice";
import { theme } from "./theme";

function App(): JSX.Element {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const refreshToken = localStorage.getItem(LocalStorageKeys.refreshToken);
        if (refreshToken) {
            const displayName = localStorage.getItem(LocalStorageKeys.displayName);
            dispatch(setUserDetails({ displayName: displayName ?? '', logged: true }));
        }
        else {
            dispatch(setUserDetails({ displayName: '', logged: false }));
        }
    }, []);

    const isLogged = useAppSelector(selectUserLogged);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <InvestagerSnackbar />
            {isLogged === null && <></>}
            {isLogged === false && <Router>
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>}
            {isLogged && <Router>
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>}
        </ThemeProvider>
    );
}

export default App;
