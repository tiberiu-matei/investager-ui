import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { AssetApi } from '../../api';
import { debounce } from '../../helpers/debounce';
import { AssetSearchResponse, AssetSummary } from '../../models/asset';
import { UserStarredAsset } from '../../models/user';
import { starAsset, useAppDispatch } from '../../store';

export function SearchAsset(props: { starredAssets: UserStarredAsset[] | undefined }): JSX.Element {
    const dispatch = useAppDispatch();

    const [searchResponse, setSearchResponse] = useState<AssetSearchResponse | undefined>(undefined);

    const [loading, setLoading] = useState(false);

    const onInputChange = async (_event: ChangeEvent<unknown>, value: string) => {
        if (value) {
            setLoading(true);
        } else {
            setLoading(false);
        }

        debouncedSearch(_event, value);
    };

    const onDebouncedSearch = async (_event: ChangeEvent<unknown>, value: string) => {
        if (value) {
            const response = await AssetApi.Search(value);
            setLoading(false);
            setSearchResponse(response);
        } else {
            setSearchResponse(undefined);
        }
    };

    const debouncedSearch = useMemo(() => debounce(onDebouncedSearch, 300), []);

    const onStar = async (_event: ChangeEvent<unknown>, value: string | AssetSummary | null) => {
        if (value !== null) {
            const assetSummary = value as AssetSummary;
            const highestOrder = props.starredAssets && props.starredAssets[props.starredAssets.length - 1];
            const request = {
                assetId: assetSummary.id ?? 0,
                displayOrder: (highestOrder?.displayOrder ?? 0) + 10,
            };

            await AssetApi.Star(request);

            dispatch(
                starAsset({
                    assetId: assetSummary.id,
                    symbol: assetSummary.symbol,
                    exchange: assetSummary.exchange,
                    key: assetSummary.key,
                    name: assetSummary.name,
                    industry: assetSummary.industry,
                    currency: assetSummary.currency,
                    displayOrder: request.displayOrder,
                    gainLoss: assetSummary.gainLoss,
                })
            );
        }
    };

    return (
        <>
            {props.starredAssets && (
                <Autocomplete
                    id="search-asset-for-watchlist"
                    options={searchResponse?.assets || []}
                    getOptionLabel={(e) => e.symbol}
                    loading={loading}
                    onChange={onStar}
                    onInputChange={onInputChange}
                    filterOptions={(e) => e}
                    noOptionsText={
                        searchResponse === undefined
                            ? 'Search by ticker symbol or asset name'
                            : 'No results found'
                    }
                    renderOption={(e) => (
                        <>
                            {e.exchange}:{e.symbol}
                        </>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Search asset" variant="outlined" />
                    )}
                ></Autocomplete>
            )}
        </>
    );
}
