"use client";

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Search } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { JobStatus } from "@/utils/types";

const SearchForm = () => {
    // set default values
    const searchParams = useSearchParams();
    // const search = searchParams.get('search') || '';
    // const jobStatus = searchParams.get('jobStatus') || 'all';
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [jobStatus, setJobStatus] = useState(searchParams.get("jobStatus") || "all");

    // console.log(jobStatus)

    const router = useRouter();
    const pathname = usePathname();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let params = new URLSearchParams();

        // #1
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const jobStatus = formData.get('jobStatus') as string;

        // #2
        params.set('search', search);
        params.set('jobStatus', jobStatus);

        // #3
        router.push(`${pathname}?${params.toString()}`);
        // console.log(`${pathname}?${params.toString()}`);
    }

    const handleReset = () => {
        let params = new URLSearchParams();
        setSearch("");          // clear input
        setJobStatus("all");
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form 
            id="jobs-search-form"
            onSubmit={handleSubmit} 
            // className="bg-muted rounded-2xl p-2.5 flex flex-col gap-4 lg:flex-row"
            className='grid grid-cols-1 gap-4 lg:grid-cols-4'
        >
            {/* search */}
            <div className="relative w-full ">
                {/* lg:max-w-sm */}
                <Label htmlFor="search" className="sr-only">
                    Search
                </Label>
                <Input
                    type="text"
                    id="search"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    // defaultValue={search}
                    placeholder="Search the jobs..."
                    className="pl-8 h-11"
                />
                <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>

            {/* selection */}
            <Select 
                name='jobStatus'
                value={jobStatus}
                onValueChange={(val) => setJobStatus(val)}
                defaultValue={jobStatus}
            >
                <SelectTrigger className="cursor-pointer py-[21px] w-full ">
                    {/* lg:w-1/6 */}
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {['all', ...Object.values(JobStatus)].map((jobStatus) => {
                        return (
                        <SelectItem key={jobStatus} value={jobStatus}>
                            {jobStatus}
                        </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>

            <div className='flex flex-col gap-4 lg:flex-row'>
                <Button 
                    type='submit' 
                    className="btn-custom w-full"
                >
                    Search
                </Button>
                <Button
                    type='button'
                    onClick={handleReset}
                    size={'lg'}
                    className='cursor-pointer h-11 w-full '
                    // lg:max-w-max
                    variant={'destructive'}
                >
                    Reset
                </Button>
            </div>
        </form>
    )
}

export default SearchForm