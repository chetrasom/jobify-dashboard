"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllJobsAction } from "@/utils/actions";
import JobCard from "./JobCard";
import ButtonContainer from "./ButtonContainer";
import ComplexButtonContainer from "./ComplexButtonContainer";

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
    // pagination
    const count = data?.count || 0;
    const page = data?.page || 0;
    const totalPages = data?.totalPages || 0;

    if (isPending) return <h2 className='text-xl'>Please Wait...</h2>;

    if (jobs.length < 1) return (
        <div className="mt-6">
            <h2 className='text-xl'>No Jobs Found...</h2>
        </div>
    )

    return (
        <section>
            <div className='mt-5 flex flex-col gap-5 items-center justify-center lg:flex-row lg:justify-between lg:max-w-[41.5rem] 2xl:max-w-[46rem]'>
                <h2 className='text-xl font-semibold capitalize '>
                    {count} jobs found
                </h2>
                {totalPages < 2 ? null : (
                    // <ButtonContainer currentPage={page} totalPages={totalPages} />
                    <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
                )}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </section>
    )
}

export default JobsList