"use server";

import prisma from "@/lib/db";
import { Prisma } from '@prisma/client';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import dayjs from 'dayjs';

async function authenticateAndRedirect(): Promise<string> {
    const { userId } = await auth();
    // console.log('userId', userId);
    if (!userId) redirect("/");
    return userId;
}

// # Create job
export async function createJobAction(values: CreateAndEditJobType): Promise<JobType | null>{
    const userId = await authenticateAndRedirect();

    try {
        createAndEditJobSchema.parse(values);

        const job: JobType = await prisma.job.create({
            data: {
                ...values,
                clerkId: userId,
            },
        });

        return job;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// # Get jobs with filters
type GetAllJobsActionTypes = {
    search?: string;
    jobStatus?: string;
    page?: number;
    limit?: number;
};
export async function getAllJobsAction({ 
    search, jobStatus, page = 1, limit = 10 
}: GetAllJobsActionTypes): Promise<{
    jobs: JobType[];
    count: number;
    page: number;
    totalPages: number;
}> {
    const userId = await authenticateAndRedirect();

    try {
        
        // # Fixed types later
        // let whereClause: Prisma.JobWhereInput = {
        //     clerkId: userId,
        // };

        let whereClause: any = {
            clerkId: userId,
        };

        // # Search
        if (search) {
            whereClause = {
                ...whereClause,
                OR: [
                    { position: { contains: search } },
                    { company: { contains: search } },
                ],
            };
        };

        // # Filters
        if (jobStatus && jobStatus !== 'all') {
            whereClause = {
                ...whereClause,
                status: jobStatus,
            };
        }

        // # Jobs & Pagination Refactor
        // const jobs: JobType[] = await prisma.job.findMany({
        //     where: whereClause,
        //     orderBy: {
        //         createdAt: "desc",
        //     },
        // });

        const skip = (page - 1) * limit;

        const jobs: JobType[] = await prisma.job.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const count: number = await prisma.job.count({
            where: whereClause,
        });

        const totalPages = Math.ceil(count / limit);
        
        return { jobs, count, page, totalPages };
    } catch (error) {
        console.error(error);
        return { jobs: [], count: 0, page: 1, totalPages: 0 };
    }
};

// # Delete job
export async function deleteJobAction(id: string): Promise<JobType | null> {
    const userId = await authenticateAndRedirect();
    try {
        const job: JobType = await prisma.job.delete({
            where: {
                id,
                clerkId: userId,
            },
        });

        return job;
    } catch (error) {
        return null;
    }
};

// # Get single job for Edit
export async function getSingleJobAction(id: string): Promise<JobType | null> {
    let job: JobType | null = null;
    const userId = await authenticateAndRedirect();

    try {
        job = await prisma.job.findUnique({
            where: {
                id,
                clerkId: userId,
            } 
        });
    } catch (error) {
        job = null;
    }

    // if job not found
    if (!job) {
        redirect('/jobs');
    }
    
    return job;
};

// # Update job
export async function updateJobAction(id: string, values: CreateAndEditJobType): Promise<JobType | null> {
    const userId = await authenticateAndRedirect();

    try {
        const job = await prisma.job.update({
            where: {
                id,
                clerkId: userId,
            },
            data: {
                ...values
            } 
        });

        return job;
    } catch (error) {
        return null;
    }
};

// # Get stats actions
export async function getStatsAction(): Promise<{
    pending: number;
    interview: number;
    declined: number;
}> {
    const userId = await authenticateAndRedirect();

    try {
        const stats = await prisma.job.groupBy({
            by: ['status'],
            _count: {
                status: true,
            },
            where: {
                clerkId: userId,
            }
        });
        // #1- console.log('stats', stats);
        /* Return result of stats:
            [
                { _count: { status: 12 }, status: 'declined' },
                { _count: { status: 21 }, status: 'interview' },
                { _count: { status: 8 }, status: 'pending' }
            ]
        */

        // ---------------------------------------------------------------------
        
        // #2- Convert to object, Then after reduce, statsObject becomes:
        /*
            { 
                pending: 8, 
                declined: 12, 
                interview: 21 
            }
        */
        const statsObject = stats.reduce((acc, curr) => {
            acc[curr.status] = curr._count.status;
            return acc;
        }, {} as Record<string, number>);
        
        // #3- Add default values
        const defaultStats = {
            pending: 0,
            declined: 0,
            interview: 0,
            ...statsObject,
        };

        return defaultStats;

    } catch (error) {
        redirect('/jobs');
    }
};

// # Get Charts Action
export async function getChartsDataAction(): Promise<
    Array<{ date: string; count: number }>
> {
    const userId = await authenticateAndRedirect();
    const sixMonthsAgo = dayjs().subtract(6, 'month').toDate();

    try {
        const jobs = await prisma.job.findMany({
            where: {
                clerkId: userId,
                createdAt: {
                    gte: sixMonthsAgo,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        let applicationsPerMonth = jobs.reduce((acc, job) => {
            const date = dayjs(job.createdAt).format('MMM YY');

            const existingEntry = acc.find((entry) => entry.date === date);

            if (existingEntry) {
                existingEntry.count += 1;
            } else {
                acc.push({ date, count: 1 });
            }

            return acc;
        }, [] as Array<{ date: string; count: number }>);

        // console.log(applicationsPerMonth)
        // [ { date: 'Aug 25', count: 41 } ]

        return applicationsPerMonth;
    } catch (error) {
        redirect('/jobs');
    }
};