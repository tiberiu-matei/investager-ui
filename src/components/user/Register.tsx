import { Button, Link, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { UserApi } from '../../api';
import { LocalStorageKeys } from '../../models/localStorageKeys';
import { RegisterRequest } from '../../models/user';
import { useAppDispatch } from '../../store/hooks';
import { setSnackbar } from '../../store/snackbarSlice';
import { setUserDetails } from '../../store/userSlice';

type FormData = {
    displayName: string;
    email: string;
    password: string;
    confirmedPassword: string;
};

//export function Register(prop: { userApi: UserApi }): JSX.Element {
export function Register(): JSX.Element {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const history = useHistory();

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

        dispatch(setSnackbar({ text: 'Account registered successfully', severity: 'success' }));
        dispatch(setUserDetails({ displayName: request.displayName, logged: true }));

        history.push('/');
    });

    return (
        <form noValidate onSubmit={onSubmit}>
            <TextField {...register("displayName", { required: "Display name is required" })} required id="displayName" label="Display Name" />

            <TextField {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is not in a valid format"
                }
            })} id="email" label="Email" required type="email" error={errors.email !== undefined} helperText={errors.email?.message} />

            <TextField {...register("password", { required: "Password is required", minLength: { value: 6, message: "The password must contain at least 6 characters" } })}
                id="password" label="Password" required type="password" error={errors.password !== undefined} helperText={errors.password?.message} />

            <TextField {...register("confirmedPassword", {
                validate: value => value === getValues("password") || "Passwords do not match"
            })} id="confirmedPassword" label="Confirm Password" required type="password" error={errors.confirmedPassword !== undefined} helperText={errors.confirmedPassword?.message} />

            <Button aria-label="Register" id="submit" type="submit" variant="contained">Register</Button>

            <Typography>Already have an account? <Link component={RouterLink} to="/login">Login</Link></Typography>
        </form>
    );
}
