import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../store/hooks';
import { setUserDetails } from '../../store/userSlice';

export function Home(): JSX.Element {
    const dispatch = useAppDispatch();
    const history = useHistory();

    function Logout() {
        localStorage.clear();
        dispatch(setUserDetails({ displayName: '', logged: false }));
        history.push('/');
    }

    return (
        <>
            <Typography>Welcome Home</Typography>
            <Button color="secondary" onClick={Logout}>Logout</Button>
        </>
    );
}
