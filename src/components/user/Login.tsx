import { Box, Button, CardActions, CardContent, Container, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { updateAxiosAccessToken, UserApi } from '../../api';
import { LocalStorageKeys } from '../../models/app';
import { LoginRequest } from '../../models/user';
import { setUserDetails, setUserTheme, useAppDispatch } from '../../store';
import { CenteredCard } from '../global';

type FormData = {
    email: string;
    password: string;
};

const useStyles = makeStyles({
    textAlign: {
        textAlign: 'center',
    },
    cardWidth: {
        maxWidth: "440px",
        width: "440px",
        minWidth: "200px",
    },
});

export function Login(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const history = useHistory();
    const classes = useStyles();

    const onSubmit = handleSubmit(async data => {
        const request: LoginRequest = {
            email: data.email,
            password: data.password
        };

        const response = await UserApi.Login(request);

        localStorage.setItem(LocalStorageKeys.accessToken, response.accessToken);
        localStorage.setItem(LocalStorageKeys.refreshToken, response.refreshToken);
        localStorage.setItem(LocalStorageKeys.displayName, response.displayName);
        localStorage.setItem(LocalStorageKeys.theme, response.theme);
        updateAxiosAccessToken(response.accessToken);

        dispatch(setUserDetails({ displayName: response.displayName, logged: true }));
        dispatch(setUserTheme(response.theme));

        history.push('/');
    });

    return (
        <CenteredCard elevation={10} cardWidthClass={classes.cardWidth}>
            <CardContent>
                <form noValidate onSubmit={onSubmit}>
                    <Box mt="5px">
                        <Typography color="primary" className={classes.textAlign} variant="h4" >Investager</Typography>
                    </Box>

                    <Box mt="10px">
                        <Typography className={classes.textAlign} variant="h6" >Log in</Typography>
                    </Box>

                    <Box mt="10px">
                        <Container>
                            <TextField {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email is not in a valid format"
                                }
                            })} id="email" label="Email" required type="email" fullWidth
                                error={errors.email !== undefined} helperText={errors.email?.message} />
                        </Container>
                    </Box>

                    <Box mt="20px">
                        <Container>
                            <TextField {...register("password", { required: "Password is required" })}
                                id="password" label="Password" required type="password" fullWidth
                                error={errors.password !== undefined} helperText={errors.password?.message} />
                        </Container>
                    </Box>

                    <Box mt="20px" display="flex" justifyContent="center">
                        <Box>
                            <CardActions>
                                <Button size="large" color="primary" aria-label="Login" id="submit" type="submit" variant="contained">Login</Button>
                            </CardActions>
                        </Box>
                    </Box>

                    <Box mt="10px">
                        <Typography className={classes.textAlign} >Don&apos;t have an account? <Link component={RouterLink} to="/register">Register</Link></Typography>
                    </Box>
                </form>
            </CardContent>
        </CenteredCard>
    );
}
