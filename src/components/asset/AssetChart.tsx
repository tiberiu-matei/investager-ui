import { makeStyles, Theme, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TimeSeriesResponse } from '../../models/timeSeries';
import {
    fetchAssetTimeSeriesByKey,
    selectAssetTimeSeries,
    useAppDispatch,
    useAppSelector
} from '../../store';

const useStyles = makeStyles((theme: Theme) => ({
    mainCard: {
        maxWidth: '1000px',
        padding: theme.spacing(1),
        marginBottom: '10px',
    },
    chartContainer: {
        marginTop: theme.spacing(1),
    },
}));

const formatTick = (timeEpochMs: number) => {
    const date = new Date(timeEpochMs);

    return date.toLocaleDateString();
};

export function AssetChart(props: { assetKey: string }): JSX.Element {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const classes = useStyles();

    const assetTimeSeries = useAppSelector(selectAssetTimeSeries);
    const [timeSeries, setTimeSeries] = useState<TimeSeriesResponse | undefined>(undefined);
    const [timePoints, setTimePoints] = useState<{ timeEpochMs: number; value: number }[] | undefined>(
        undefined
    );

    const getDefaultChartRange = () => {
        const dateNow = new Date();
        const from = new Date(new Date().setFullYear(dateNow.getFullYear() - 1)).getTime();

        return { from: from, to: dateNow.getTime() };
    };

    const chartRange = getDefaultChartRange();

    useEffect(() => {
        dispatch(fetchAssetTimeSeriesByKey(props.assetKey));
    }, []);

    useEffect(() => {
        const newTimeSeries = assetTimeSeries.find((e) => e.key === props.assetKey);
        if (newTimeSeries !== timeSeries) {
            setTimeSeries(newTimeSeries);
            const points = newTimeSeries?.points.map((e) => {
                const date = new Date(e.time);
                return { timeEpochMs: date.getTime(), value: e.value };
            });

            setTimePoints(points);
        }
    }, [assetTimeSeries]);

    return (
        <ResponsiveContainer width="100%" height={400} className={classes.chartContainer}>
            {timePoints ? (
                <LineChart data={timePoints}>
                    <CartesianGrid />
                    <XAxis
                        allowDataOverflow
                        type="number"
                        dataKey="timeEpochMs"
                        domain={[chartRange.from, chartRange.to]}
                        tickFormatter={formatTick}
                    />

                    <YAxis allowDataOverflow />
                    <Tooltip />
                    <Line
                        isAnimationActive={false}
                        dataKey="value"
                        dot={false}
                        strokeWidth={2}
                        stroke={theme.palette.primary.light}
                    ></Line>
                </LineChart>
            ) : (
                <> </>
            )}
        </ResponsiveContainer>
    );
}
