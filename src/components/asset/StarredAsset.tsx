import { Box, Card, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { AssetApi } from '../../api';
import { AssetSummary } from '../../models/asset';
import { TimePoint, TimeRange, TimeSeries } from '../../models/timeSeries';
import {
    createSelectAssetTimeSeriesByKey,
    fetchAssetTimeSeriesByKey,
    unstarAsset,
    useAppDispatch,
    useAppSelector
} from '../../store';

const useStyles = makeStyles(() => ({
    cardWidth: {
        maxWidth: "1000px",  
    },
    gain: {
        color: 'green',
    },
    loss: {
        color: 'red',
    },
    gainLossFlex: {
        flex: "1 1 60px"
    }
}));

const oneWeekInMs = (): number => 7 * 24 * 60 * 60 * 1000;

const getClosestPoint = (points: TimePoint[], target: Date): TimePoint | null => {
    const targetUtcTime = target.getTime() + target.getTimezoneOffset() * 60 * 1000;
    for (let i = 0; i < points.length; i++) {
        const pointTime = points[i].time.getTime();
        if (pointTime < targetUtcTime) {
            if (targetUtcTime - pointTime > oneWeekInMs()) {
                return null;
            }

            if (i > 0) {
                i--;
            }

            return points[i];
        }
    }

    return null;
};

const noGainLoss = (key: number, flexClass: string) => <Box key={key} className={flexClass}>-</Box>;

export function StarredAsset(props: { assetSummary: AssetSummary; timeRanges: TimeRange[] }): JSX.Element {
    const dispatch = useAppDispatch();
    const timeSeriesResponse = useAppSelector(createSelectAssetTimeSeriesByKey(props.assetSummary.key));
    const timeSeries: TimeSeries | undefined = timeSeriesResponse && {
        key: timeSeriesResponse.key,
        points: timeSeriesResponse.points.map((e) => ({ time: new Date(e.time), value: e.value })),
    };

    const classes = useStyles();

    useEffect(() => {
        if (!timeSeriesResponse) {
            dispatch(fetchAssetTimeSeriesByKey(props.assetSummary.key));
        }
    }, []);

    const handleUnstar = async (event: React.MouseEvent<HTMLButtonElement>) => {
        await AssetApi.Unstar(props.assetSummary.id);
        dispatch(unstarAsset(props.assetSummary.id));
    };

    return (
        <Card elevation={10} className={classes.cardWidth}>
            <Box display="flex">
                <Box flex="0 0 400px">
                    <Typography variant="h5">{props.assetSummary.symbol}</Typography>
                    <Typography variant="body2">
                        {props.assetSummary.name}
                    </Typography>
                    <Typography>
                        {props.assetSummary.exchange}
                    </Typography>
                </Box>
                {props.timeRanges.map((e) => {
                    const key = e.from.getTime();

                    if (!timeSeries) {
                        return noGainLoss(key, classes.gainLossFlex);
                    }

                    const fromPoint = getClosestPoint(timeSeries.points, e.from);
                    const toPoint = getClosestPoint(timeSeries.points, e.to);

                    if (!fromPoint || !toPoint) {
                        return noGainLoss(key, classes.gainLossFlex);
                    }

                    const difference = ((toPoint.value - fromPoint.value) / fromPoint.value) * 100;
                    const displayDifference = difference.toFixed(2);

                    if (difference >= 0) {
                        return (
                            <Box key={key} className={`${classes.gain} ${classes.gainLossFlex}`}>
                                +{displayDifference}%
                            </Box>
                        );
                    } else {
                        return (
                            <Box key={key} className={`${classes.loss} ${classes.gainLossFlex}`}>
                                {displayDifference}%
                            </Box>
                        );
                    }
                })}
                <Box flex="0 0 50px">
                    <IconButton aria-label="remove bookmark" onClick={handleUnstar}>
                        <Star />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}
