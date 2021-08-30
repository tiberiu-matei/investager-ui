import { Box, Button, CardActions, CardContent, Container, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { updateAxiosAccessToken, UserApi } from '../../api';
import { LocalStorageKeys } from '../../models/app';
import { RegisterRequest } from '../../models/user';
import { setSnackbar, setUserDetails, useAppDispatch } from '../../store';
import { CenteredCard } from '../global';

type FormData = {
    displayName: string;
    email: string;
    password: string;
    confirmedPassword: string;
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

export function Register(): JSX.Element {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const history = useHistory();
    const classes = useStyles();

    const onSubmit = handleSubmit(async data => {
        const request: RegisterRequest = {
            displayName: data.displayName,
            email: data.email,
            password: data.password
        };

        const response = await UserApi.Register(request);

        localStorage.setItem(LocalStorageKeys.accessToken, response.accessToken);
        localStorage.setItem(LocalStorageKeys.refreshToken, response.refreshToken);
        localStorage.setItem(LocalStorageKeys.displayName, request.displayName);
        updateAxiosAccessToken(response.accessToken);

        dispatch(setSnackbar({ text: 'Account registered successfully', severity: 'success' }));
        dispatch(setUserDetails({ displayName: request.displayName, logged: true }));

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
                        <Typography className={classes.textAlign} variant="h6" >Create account</Typography>
                    </Box>

                    <Box mt="10px">
                        <Container>
                            <TextField {...register("displayName", { required: "Display name is required" })}
                                fullWidth required id="displayName" label="Display Name" />
                        </Container>
                    </Box>

                    <Box mt="10px">
                        <Container>
                            <TextField {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email is not in a valid format"
                                }
                            })} id="email" fullWidth label="Email" required type="email" error={errors.email !== undefined} helperText={errors.email?.message} />
                        </Container>
                    </Box>

                    <Box mt="10px">
                        <Container>
                            <TextField {...register("password", { required: "Password is required", minLength: { value: 6, message: "The password must contain at least 6 characters" } })}
                                fullWidth id="password" label="Password" required type="password" error={errors.password !== undefined} helperText={errors.password?.message} />
                        </Container>
                    </Box>

                    <Box mt="10px">
                        <Container>
                            <TextField {...register("confirmedPassword", {
                                validate: value => value === getValues("password") || "Passwords do not match"
                            })} fullWidth id="confirmedPassword" label="Confirm Password" required type="password" error={errors.confirmedPassword !== undefined} helperText={errors.confirmedPassword?.message} />
                        </Container>
                    </Box>

                    <Box mt="20px" display="flex" justifyContent="center">
                        <Box>
                            <CardActions>
                                <Button size="large" color="primary" aria-label="Register" id="submit" type="submit" variant="contained">Register</Button>
                            </CardActions>
                        </Box>
                    </Box>

                    <Box mt="10px">
                        <Typography className={classes.textAlign}>Already have an account? <Link component={RouterLink} to="/login">Login</Link></Typography>
                    </Box>
                </form>
            </CardContent>
        </CenteredCard>
    );
}
