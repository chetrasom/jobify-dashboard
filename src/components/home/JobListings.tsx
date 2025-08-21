import React from 'react'
import Link from 'next/link';
import { MapPin, DollarSign, Briefcase, Building2, Calendar, Edit, Eye } from "lucide-react"
import moment from 'moment';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import JobInfo from '../JobInfo';

const jobsPreview = [
    {
        id: 1,
        position: "Frontend Developer",
        company: "Meta",
        location: "Mountain View, CA",
        salary: "$100,000",
        date: "2022-01-01",
        status: "pending",
        mode: "full-time",
    },
    {
        id: 2,
        position: "Backend Developer",
        company: "Google",
        location: "Mountain View, CA",
        salary: "$100,000",
        date: "2022-01-01",
        status: "interview",
        mode: "full-time",
    },
    {
        id: 3,
        position: "Mobile Developer",
        company: "Twitter",
        location: "Mountain View, CA",
        salary: "$100,000",
        date: "2022-01-01",
        status: "pending",
        mode: "full-time",
    }
];

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

const JobListings = () => {
    return (
        <section id='opportunities' className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Latest Opportunities
                    </h3>
                    <p className="text-lg text-muted-foreground font-[var(--font-source-sans)]">
                        Discover your next career move from our curated job listings
                    </p>
                </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {jobsPreview.map((job) => {
                    const date = moment(job.id).format("MMM Do, YYYY");
                    const status = statusStyles[job.status as keyof typeof statusStyles];

                    return (
                        <Card key={job.id}>
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
                                    className="h-11 flex-1 font-medium bg-accent-foreground hover:bg-accent-foreground/80 dark:bg-accent-foreground/20 dark:hover:bg-accent-foreground/40 dark:text-white"
                                >
                                    <Link href={`/jobs`}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>

            </div>
        </section>
    )
}

export default JobListings