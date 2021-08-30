import { Box, Card, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import React from 'react';
import { AssetApi } from '../../api';
import { UserStarredAsset } from '../../models/user';
import { unstarAsset, useAppDispatch } from '../../store';

const useStyles = makeStyles(() => ({
    mainCard: {
        maxWidth: '1000px',
        padding: '5px',
        marginBottom: '10px',
    },
    gain: {
        color: 'green',
    },
    loss: {
        color: 'red',
    },
    gainLossFlex: {
        flex: '1 1 60px',
    },
}));

const noGainLossBox = (flexClass: string) => (
    <Box
        className={flexClass}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
    >
        <Box>-</Box>
    </Box>
);

const gainLossBox = (value: number, gainClass: string, lossClass: string, flexClass: string) => {
    if (value >= 0) {
        return (
            <Box
                className={flexClass}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box className={gainClass}>+{value.toFixed(2)}%</Box>
            </Box>
        );
    } else {
        return (
            <Box
                className={flexClass}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box className={lossClass}>{value.toFixed(2)}%</Box>
            </Box>
        );
    }
};

export function StarredAsset(props: { starredAsset: UserStarredAsset }): JSX.Element {
    const dispatch = useAppDispatch();

    const classes = useStyles();

    const handleUnstar = async () => {
        await AssetApi.Unstar(props.starredAsset.assetId);
        dispatch(unstarAsset(props.starredAsset.assetId));
    };

    return (
        <Card elevation={10} className={classes.mainCard}>
            <Box display="flex">
                <Box flex="0 0 400px">
                    <Typography variant="h5">{props.starredAsset.symbol}</Typography>
                    <Typography variant="body2">{props.starredAsset.name}</Typography>
                    <Typography>{props.starredAsset.exchange}</Typography>
                </Box>
                {props.starredAsset.gainLoss.last3Days === null
                    ? noGainLossBox(classes.gainLossFlex)
                    : gainLossBox(
                          props.starredAsset.gainLoss.last3Days,
                          classes.gain,
                          classes.loss,
                          classes.gainLossFlex
                      )}
                <Box
                    display="flex"
                    flex="0 0 50px"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box>
                        <IconButton aria-label="remove bookmark" onClick={handleUnstar}>
                            <Star />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}
