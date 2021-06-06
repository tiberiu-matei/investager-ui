import { Button, Link, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { UserApi } from '../../api';
import { LocalStorageKeys } from '../../models/localStorageKeys';
import { LoginRequest } from '../../models/user';
import { useAppDispatch } from '../../store/hooks';
import { setUserDetails } from '../../store/userSlice';

type FormData = {
    email: string;
    password: string;
};

export function Login(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const history = useHistory();

    const onSubmit = handleSubmit(async data => {
        const request: LoginRequest = {
            email: data.email,
            password: data.password
        };

        const response = await UserApi.Login(request);

        localStorage.setItem(LocalStorageKeys.accessToken, response.accessToken);
        localStorage.setItem(LocalStorageKeys.refreshToken, response.refreshToken);
        localStorage.setItem(LocalStorageKeys.displayName, response.displayName);

        dispatch(setUserDetails({ displayName: response.displayName, logged: true }));

        history.push('/');
    });

    return (
        <form noValidate onSubmit={onSubmit}>
            <TextField {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is not in a valid format"
                }
            })} id="email" label="Email" required type="email" error={errors.email !== undefined} helperText={errors.email?.message} />

            <TextField {...register("password", { required: "Password is required" })}
                id="password" label="Password" required type="password" error={errors.password !== undefined} helperText={errors.password?.message} />

            <Button aria-label="Login" id="submit" type="submit" variant="contained">Login</Button>

            <Typography>Don&apos;t have an account? <Link component={RouterLink} to="/register">Register</Link></Typography>
        </form>
    );
}
