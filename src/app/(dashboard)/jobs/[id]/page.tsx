import EditJobForm from "@/components/form/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
const JobDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const queryClient = new QueryClient();
    const { id } = await params;

    await queryClient.prefetchQuery({
        queryKey: ['jobs', id],
        queryFn: () => getSingleJobAction(id),
    });

    // console.log(queryClient.getQueryData(['jobs', id]));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <EditJobForm jobId={id} />
        </HydrationBoundary>
    )
}

export default JobDetailPage