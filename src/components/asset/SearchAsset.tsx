import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent } from 'react';
import { AssetApi } from '../../api';
import { AssetSummary } from '../../models/asset';
import { UserStarredAsset } from '../../models/user';
import { starAsset, useAppDispatch } from '../../store';

export function SearchAsset(props: {
    assetSummaries: AssetSummary[] | undefined;
    starredAssets: UserStarredAsset[] | undefined;
}): JSX.Element {
    const dispatch = useAppDispatch();

    const onSearchChange = async (event: ChangeEvent<any>, value: AssetSummary | null) => {
        const highestOrder = props.starredAssets && props.starredAssets[props.starredAssets.length - 1];
        const request = { assetId: value?.id ?? 0, displayOrder: (highestOrder?.displayOrder ?? 0) + 10 };

        await AssetApi.Star(request);

        dispatch(starAsset(request));
    };

    return (
        <>
            {props.assetSummaries && props.starredAssets && (
                <Autocomplete
                    id="search-asset-for-watchlist"
                    options={props.assetSummaries}
                    getOptionLabel={(e) => e.symbol}
                    onChange={onSearchChange}
                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                ></Autocomplete>
            )}
        </>
    );
}
