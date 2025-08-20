import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

import { getStatsAction, getChartsDataAction } from '@/utils/actions';
import StatsContainer from '@/components/StatsContainer';
import ChartsContainer from '@/components/ChartsContainer';

const StatsPage = async () => {
    // #1- Test Stats = basic function call to get results.
    // getStatsAction();

    // #2- Test Stats = async function
    // const stats = await getStatsAction();

    // #3- Test Charts
    // getChartsDataAction();

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['stats'],
        queryFn: () => getStatsAction(),
    });
    // console.log(queryClient.getQueryData(['stats']));

    await queryClient.prefetchQuery({
        queryKey: ['charts'],
        queryFn: () => getChartsDataAction(),
    });
    // console.log(queryClient.getQueryData(['charts']));
    
    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <StatsContainer />
                <ChartsContainer />
            </HydrationBoundary>
        </>
    )
}

export default StatsPage