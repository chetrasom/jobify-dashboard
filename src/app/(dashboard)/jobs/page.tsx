import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import { getAllJobsAction } from '@/utils/actions';
import SearchForm from '@/components/SearchForm';
import JobsList from '@/components/JobsList';

const JobsPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['jobs', '', 'all', 1],
        queryFn: () => getAllJobsAction({}),
    });

    // console.log(queryClient.getQueryData(['jobs', '', 'all', 1]));

    return (
        <section>
            <div className="flex items-center justify-between">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        All Jobs Applications List
                    </h1>
                    <p className="text-muted-foreground">
                        The Jobs Page displays a complete list of jobs created by the logged-in user.
                    </p>
                </div>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <SearchForm />
                <JobsList />
            </HydrationBoundary>
        </section>
    )
}

export default JobsPage