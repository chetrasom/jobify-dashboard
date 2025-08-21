"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import CustomFormField from "./CustomFormField";
import CustomFormSelect from "./CustomFormSelect";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createJobAction, getSingleJobAction, updateJobAction } from "@/utils/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { JobStatus, JobMode, CreateAndEditJobType, createAndEditJobSchema } from "@/utils/types";
type EditJobFormProps = { 
    jobId: string 
};

const EditJobForm = ({ jobId }: EditJobFormProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    // #1- get single job
    const { data } = useQuery({
        queryKey: ['job', jobId],
        queryFn: () => getSingleJobAction(jobId),
    });

    // #2- update job
    const { mutate, isPending } = useMutation({
        mutationFn: (values: CreateAndEditJobType) => updateJobAction(jobId, values),
        onSuccess: (data) => {
            if (!data) {
                toast.error('There was an error')
                return;
            }
            toast.success('Job updated successfully');

            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            queryClient.invalidateQueries({ queryKey: ['job', jobId] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            router.push('/jobs');
            // form.reset();
        },
    });

    // 1. Define form. and get default values from single job action
    const form = useForm<CreateAndEditJobType>({
        resolver: zodResolver(createAndEditJobSchema),
            defaultValues: {
                position: data?.position || '',
                company: data?.company || '',
                location: data?.location || '',
                status: (data?.status as JobStatus) || JobStatus.Pending,
                mode: (data?.mode as JobMode) || JobMode.FullTime,
            },
    });

    function onSubmit(values: CreateAndEditJobType) {
        mutate(values);
    }

    return (
        <div className="max-w-md">
            <Form {...form}>
                <h2 className='capitalize font-semibold text-4xl mb-6'>edit job</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <CustomFormField name="position" control={form.control} placeholder="Enter position" />
                    <CustomFormField name="company" control={form.control} placeholder="Enter company" />
                    <CustomFormField name="location" control={form.control} placeholder="Enter location" />

                    <div className="flex gap-4 justify-between">
                        {/* job status */}
                        <CustomFormSelect
                            name='status'
                            control={form.control}
                            labelText='job status'
                            items={Object.values(JobStatus)}
                        />

                        
                        {/* job  type */}
                        <CustomFormSelect
                            name='mode'
                            control={form.control}
                            labelText='job mode'
                            items={Object.values(JobMode)}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        className='self-end capitalize h-11'
                        disabled={isPending}
                    >
                        {isPending ? 'updating...' : 'edit job'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default EditJobForm