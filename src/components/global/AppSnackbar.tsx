import { Snackbar as MuiSnackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { selectSnackbar, useAppSelector } from '../../store';

export function AppSnackbar(): JSX.Element {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const snackbarState = useAppSelector(selectSnackbar);

    useEffect(() => {
        if (snackbarState.text) {
            setSnackbarOpen(true);
        }
    }, [snackbarState]);

    function OnClose() {
        setSnackbarOpen(false);
    }

    return (
        <MuiSnackbar
            open={snackbarOpen}
            onClose={OnClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={2000}>
            <Alert severity={snackbarState.severity}>
                {snackbarState.text}
            </Alert>
        </MuiSnackbar>
    );
}
