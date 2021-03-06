import { Box, Card, Collapse, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import React, { useState } from 'react';
import { AssetApi } from '../../api';
import { UserStarredAsset } from '../../models/user';
import { unstarAsset, useAppDispatch } from '../../store';
import { AssetChart } from './AssetChart';

const useStyles = makeStyles((theme: Theme) => ({
    mainCard: {
        maxWidth: '1000px',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(2),
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
    pointer: {
        cursor: 'pointer',
    },
    leftPadding: {
        paddingLeft: theme.spacing(1),
    },
}));

const gainLossBox = (value: number, gainClass: string, lossClass: string, flexClass: string) => {
    if (value === null) {
        return (
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
    }

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

    const [chartOpen, setChartOpen] = useState(false);

    const handleUnstar = async () => {
        await AssetApi.Unstar(props.starredAsset.assetId);
        dispatch(unstarAsset(props.starredAsset.assetId));
    };

    const expandCollapseChart = () => {
        if (chartOpen) {
            setChartOpen(false);
        } else {
            setChartOpen(true);
        }
    };

    return (
        <Card elevation={10} className={classes.mainCard}>
            <Box display="flex" flexDirection="column">
                <Box display="flex">
                    <Box
                        display="flex"
                        flex="0 0 400px"
                        flexDirection="column"
                        justifyContent="center"
                        className={classes.pointer}
                        onClick={expandCollapseChart}
                    >
                        <Box className={classes.leftPadding}>
                            <Typography variant="h5">{props.starredAsset.symbol}</Typography>
                        </Box>
                    </Box>
                    {gainLossBox(
                        props.starredAsset.gainLoss.last3Days,
                        classes.gain,
                        classes.loss,
                        classes.gainLossFlex
                    )}
                    {gainLossBox(
                        props.starredAsset.gainLoss.lastWeek,
                        classes.gain,
                        classes.loss,
                        classes.gainLossFlex
                    )}
                    {gainLossBox(
                        props.starredAsset.gainLoss.lastMonth,
                        classes.gain,
                        classes.loss,
                        classes.gainLossFlex
                    )}
                    {gainLossBox(
                        props.starredAsset.gainLoss.lastYear,
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
            </Box>
            <Box>
                <Collapse in={chartOpen} timeout="auto" unmountOnExit>
                    <Typography variant="body2">{props.starredAsset.name}</Typography>
                    <AssetChart assetKey={props.starredAsset.key} />
                </Collapse>
            </Box>
        </Card>
    );
}
