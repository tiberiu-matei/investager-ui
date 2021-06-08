import { Box, Card, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    maxHeight: {
        height: "100%",
    }
});

export function CenteredCard(props: { children: React.ReactNode, cardWidthClass: string, elevation: number }): JSX.Element {
    const classes = useStyles();

    return (
        <Box display="flex" className={classes.maxHeight} justifyContent="center" alignItems="center">
            <Box>
                <Box className={props.cardWidthClass} alignContent="center">
                    <Card elevation={props.elevation}>
                        {props.children}
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
