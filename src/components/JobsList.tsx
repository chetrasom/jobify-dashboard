"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllJobsAction } from "@/utils/actions";
import JobCard from "./JobCard";
import ButtonContainer from "./ButtonContainer";
import ComplexButtonContainer from "./ComplexButtonContainer";
import { Building2, Loader2Icon } from "lucide-react";

const JobsList = () => {
    const searchParams = useSearchParams()
    // for query key
    const search = searchParams.get('search') || '';
    const jobStatus = searchParams.get('jobStatus') || 'all';
    const pageNumber = Number(searchParams.get('page')) || 1;
    
    const { data, isPending } = useQuery({
        // queryKey: ['jobs', '', 'all', 1], prefetch key
        queryKey: ['jobs', search ?? '', jobStatus, pageNumber],
        queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
    });

    const jobs = data?.jobs || [];
    console.log(jobs)
    // pagination
    const count = data?.count || 0;
    const page = data?.page || 0;
    const totalPages = data?.totalPages || 0;

    if (isPending) return (
        <div className="flex items-center justify-center gap-2 aspect-video">
            <Loader2Icon className="animate-spin size-10 text-primary" />
            <h2 className='text-xl font-medium capitalize'>Please Wait...</h2>
        </div>
    )

    if (jobs.length < 1) return (
        <div className="mt-6">
            <h2 className='text-xl font-bold'>No Jobs Found...</h2>
        </div>
    )

    return (
        <section>
            <div className='my-6 flex flex-col gap-5 items-center justify-center lg:flex-row lg:justify-between'>
                {/* lg:max-w-[41.5rem] 2xl:max-w-[46rem] */}
                <h2 className='text-[22px] font-semibold capitalize flex gap-2.5 items-center lg:text-2xl'>
                    <Building2 className="h-6 w-6" /> {count} jobs found
                </h2>
                <div className="hidden lg:block">
                    {totalPages < 2 ? null : (
                        <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
                    )}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>

            <div className="py-5 lg:hidden">
                {totalPages < 2 ? null : (
                    <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
                )}
            </div>
        </section>
    )
}

export default JobsList