import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

import CreateJobForm from "@/components/form/CreateJobForm";
import FormBasic from "@/components/FormBasic";

const AddJobPage = () => {
    const queryClient = new QueryClient();

    return (
        <section>
            <div className="flex items-center justify-between">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Create Job Posting</h1>
                    <p className="text-muted-foreground">
                        Fill out the form below to create a new job posting for your organization.
                    </p>
                </div>
                {/* <FormBasic /> */}
            </div>

            {/* Hydration */}
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CreateJobForm />
            </HydrationBoundary>

        </section>
    )
}

export default AddJobPage