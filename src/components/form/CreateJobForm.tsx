"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { createAndEditJobSchema, CreateAndEditJobType, JobStatus, JobMode } from "@/utils/types";

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import CustomFormField from "./CustomFormField";
import CustomFormSelect from "./CustomFormSelect";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobAction } from "@/utils/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2Icon, Plus } from "lucide-react";

const CreateJobForm = () => {
    // 1. Define form.
    const form = useForm<CreateAndEditJobType>({
        resolver: zodResolver(createAndEditJobSchema),
            defaultValues: {
                position: '',
                company: '',
                location: '',
                status: JobStatus.Pending,
                mode: JobMode.FullTime,
            },
    });

    // 3. logic with tanstack query
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
        onSuccess: (data) => {
            if (!data) {
                toast.error('There was an error')
                return;
            }
            toast.success('Job created successfully');

            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            queryClient.invalidateQueries({ queryKey: ['charts'] });

            // router.push('/jobs');
            form.reset();
        }
    });

    // 2. Define a submit handler.
    function onSubmit(values: CreateAndEditJobType) {
        mutate(values);
    }

    return (
        <div className="max-w-lg md:mx-auto">
            <Form {...form}>
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

                    <div className="mt-8 flex justify-center">
                        <Button 
                            type="submit" 
                            className='self-end capitalize h-11 w-full dark:text-white cursor-pointer'
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="flex items-center gap-x-1 ">
                                    <Loader2Icon className="animate-spin" />
                                    Creating...
                                </div>
                            ) : (
                                <div className="flex items-center gap-x-1">
                                    <Plus className="h-4 w-4" />
                                    Create job
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateJobForm