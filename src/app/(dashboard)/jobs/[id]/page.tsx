import prisma from "@/lib/db";
import EditJobForm from "@/components/form/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import { Metadata } from "next";
import { notFound } from 'next/navigation'

// 2. Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const job = await getSingleJobAction(id);

    if (!job) {
        return {
            title: "Job Not Found",
            description: "This job does not exist.",
        };
    }

    return {
        title: `${job.position} | My Job Site`,
        description: job.company,
    };
}

const JobDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const queryClient = new QueryClient();
    const { id } = await params;

    await queryClient.prefetchQuery({
        queryKey: ['job', id],
        queryFn: () => getSingleJobAction(id),
    });

    if (!id) {
        return notFound();
    }

    // console.log(queryClient.getQueryData(['jobs', id]));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <EditJobForm jobId={id} />
        </HydrationBoundary>
    )
}

export default JobDetailPage;


// 1. Static params for all job IDs
export async function generateStaticParams() {
    const jobs = await prisma.job.findMany({
        select: { id: true },
    });

    return jobs.map((job) => ({
        id: job.id.toString(),
    }));
};