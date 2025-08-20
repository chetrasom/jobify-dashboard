"use client";

import Link from 'next/link';
import { JobType } from '@/utils/types';
import { MapPin, DollarSign, Briefcase, Building2, Calendar, Edit } from "lucide-react"
import moment from 'moment';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

import JobInfo from './JobInfo';
import DeleteJobBtn from './DeleteJobBtn';

const statusStyles: Record<
    "pending" | "declined" | "interview",
    { bg: string; text: string; dot: string; label: string }
> = {
    pending: {
        bg: "bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10",
        text: "text-amber-500",
        dot: "bg-amber-500",
        label: "Pending",
    },
    declined: {
        bg: "bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10",
        text: "text-red-500",
        dot: "bg-red-500",
        label: "Declined",
    },
    interview: {
        bg: "bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10",
        text: "text-emerald-500",
        dot: "bg-emerald-500",
        label: "Interview",
    },
};
const JobCard = ({ job }: { job: JobType }) => {
    // const date = new Date(job.createdAt).toLocaleDateString(); // format date
    const date = moment(job.createdAt).format("MMM Do, YYYY");
    const status = statusStyles[job.status as keyof typeof statusStyles];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-base lg:text-xl 2xl:text-2xl font-bold leading-tight mb-1 group-hover:text-primary transition-colors">
                            {job.position}
                        </CardTitle>
                        <div className="text-muted-foreground font-medium flex items-center gap-2">
                            <Building2 className="h-4 w-4" /> {job.company}
                        </div>
                    </div>

                    <Badge className={`${status.bg} ${status.text} shadow-none rounded-full`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${status.dot} mr-2`} />
                        {status.label}
                    </Badge>
                </div>
            </CardHeader>
            <Separator />

            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                        <JobInfo icon={<MapPin className="h-4 w-4 text-muted-foreground shrink-0" />} text={job.location} />
                        <JobInfo icon={<Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />} text={job.mode} />
                    </div>

                    <div className="space-y-3">
                        <JobInfo icon={<Calendar className="h-4 w-4 text-muted-foreground shrink-0" />} text={date} />

                        <div className="flex items-center gap-2 text-sm sr-only">
                            <DollarSign className="h-4 w-4 text-green-600 shrink-0" />
                            <span className="font-semibold text-green-700 dark:text-green-400"></span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className='flex gap-4'>
                <Button 
                    asChild 
                    size={'lg'}  
                    className="flex-1 font-medium bg-accent-foreground hover:bg-accent-foreground/80 dark:bg-accent-foreground/20 dark:hover:bg-accent-foreground/40 dark:text-white"
                >
                    <Link href={`/jobs/${job.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Link>
                </Button>

                <DeleteJobBtn id={job.id} />
            </CardFooter>
        </Card>
    )
}

export default JobCard