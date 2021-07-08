import React, { useEffect } from 'react';
import {
    fetchAssetSummaries,
    fetchUserStarredAssets,
    selectAssetSummaries,
    selectUserStarredAssets,
    useAppDispatch,
    useAppSelector
} from '../../store';
import { SearchAsset } from './SearchAsset';
import { StarredAsset } from './StarredAsset';

export function StarredAssets(): JSX.Element {
    const dispatch = useAppDispatch();
    const assetSummaries = useAppSelector(selectAssetSummaries);
    const starredAssets = useAppSelector(selectUserStarredAssets);
    const dateNow = new Date();

    const threeDaysAgo = new Date(dateNow.getTime());
    threeDaysAgo.setDate(dateNow.getDate() - 3);

    const oneWeekAgo = new Date(dateNow.getTime());
    oneWeekAgo.setDate(dateNow.getDate() - 7);

    const oneMonthAgo = new Date(dateNow.getTime());
    oneMonthAgo.setMonth(dateNow.getMonth() - 1);

    const threeMonthsAgo = new Date(dateNow.getTime());
    threeMonthsAgo.setMonth(dateNow.getMonth() - 3);

    const sixMonthsAgo = new Date(dateNow.getTime());
    sixMonthsAgo.setMonth(dateNow.getMonth() - 6);

    const oneYearAgo = new Date(dateNow.getTime());
    oneYearAgo.setFullYear(dateNow.getFullYear() - 1);

    const threeYearsAgo = new Date(dateNow.getTime());
    threeYearsAgo.setFullYear(dateNow.getFullYear() - 3);

    const timeRanges = [
        { from: threeDaysAgo, to: dateNow },
        { from: oneWeekAgo, to: dateNow },
        { from: oneMonthAgo, to: dateNow },
        { from: threeMonthsAgo, to: dateNow },
        { from: sixMonthsAgo, to: dateNow },
        { from: oneYearAgo, to: dateNow },
        { from: threeYearsAgo, to: dateNow },
    ];

    useEffect(() => {
        if (!assetSummaries) {
            dispatch(fetchAssetSummaries());
        }

        if (!starredAssets) {
            dispatch(fetchUserStarredAssets());
        }
    }, []);

    return (
        <>
            <SearchAsset assetSummaries={assetSummaries} starredAssets={starredAssets}></SearchAsset>
            {assetSummaries &&
                starredAssets &&
                starredAssets.map((e) => {
                    const summary = assetSummaries.find((x) => x.id === e.assetId);

                    return (
                        summary && (
                            <StarredAsset
                                key={summary.key}
                                assetSummary={summary}
                                timeRanges={timeRanges}
                            ></StarredAsset>
                        )
                    );
                })}
        </>
    );
}
