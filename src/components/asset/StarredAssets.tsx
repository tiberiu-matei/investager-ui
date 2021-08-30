import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { fetchUserStarredAssets, selectUserStarredAssets, useAppDispatch, useAppSelector } from '../../store';
import { SearchAsset } from './SearchAsset';
import { StarredAsset } from './StarredAsset';

const useStyles = makeStyles({
    mainBox: {
        marginTop: '20px',
    },
    searchBox: {
        marginBottom: '10px',
    },
});

export function StarredAssets(): JSX.Element {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const starredAssets = useAppSelector(selectUserStarredAssets);

    useEffect(() => {
        if (!starredAssets) {
            dispatch(fetchUserStarredAssets());
        }
    }, []);

    return (
        <>
            <Box display="flex" justifyContent="center" className={classes.mainBox}>
                <Box flex="0 0 800px">
                    <Box className={classes.searchBox}>
                        <SearchAsset starredAssets={starredAssets}></SearchAsset>
                    </Box>
                    {starredAssets &&
                        starredAssets.map((e) => {
                            return <StarredAsset key={e.key} starredAsset={e}></StarredAsset>;
                        })}
                </Box>
            </Box>
        </>
    );
}
