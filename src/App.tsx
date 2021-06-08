import { Box } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import { AppTheme } from "./components/global/AppTheme";
import { Header } from "./components/global/Header";
import { Home } from "./components/global/Home";
import { Snackbar as InvestagerSnackbar } from "./components/global/Snackbar";
import { Login, Register } from "./components/user";
import { useAppSelector } from "./store/hooks";
import { selectUserLogged } from "./store/userSlice";

function App(): JSX.Element {
    const isLogged = useAppSelector(selectUserLogged);

    return (
        <AppTheme>
            <InvestagerSnackbar />
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
