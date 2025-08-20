"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { createAndEditJobSchema, CreateAndEditJobType, JobStatus, JobMode } from "@/utils/types";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from '@/components/ui/form';

import CustomFormField from "./form/CustomFormField";
import CustomFormSelect from "./form/CustomFormSelect";
import { useState } from "react";

const FormBasic = () => {
    const [open, setOpen] = useState(false);

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

    // 2. Define a submit handler.
    function onSubmit(values: CreateAndEditJobType) {
        console.log(values)
        form.reset();
        form.reset({
            status: JobStatus.Pending,
            mode: JobMode.FullTime,
        });
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                form.reset()
                setOpen(state)
            }}
        >
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">Open Dialog</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <CustomFormField name="position" control={form.control} placeholder="Enter position" />
                            <CustomFormField name="company" control={form.control} placeholder="Enter company" />
                            <CustomFormField name="location" control={form.control} placeholder="Enter location" />

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

                            <div className="flex justify-end gap-4">
                                <DialogClose asChild>
                                    <Button 
                                        variant="outline"
                                        onClick={() => {
                                            form.reset();
                                            setOpen(false);
                                        }}
                                        className='self-end capitalize h-11'
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button type="submit" className='self-end capitalize h-11'>
                                    create job
                                </Button>
                            </div>
                        </form>
                    </Form>

                    {/* <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default FormBasic