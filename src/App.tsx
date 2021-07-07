import { Box } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import { AppSnackbar, AppTheme, Header, Home } from "./components/global";
import { Login, Register } from "./components/user";
import { selectUserLogged, useAppSelector } from "./store";

function App(): JSX.Element {
    const isLogged = useAppSelector(selectUserLogged);

    return (
        <AppTheme>
            <AppSnackbar />
            <Router>
                <Box height="100%" display="flex" flexDirection="column">
                    <Box>
                        {isLogged && <Header />}
                    </Box>
                    <Box flexGrow={1}>
                        {isLogged === null && <></>}
                        {isLogged === false && <Switch>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/">
                                <Login />
                            </Route>
                        </Switch>}
                        {isLogged && <Switch>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>}
                    </Box>
                </Box>
            </Router>
        </AppTheme>
    );
}

export default App;
