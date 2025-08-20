"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAction } from "@/utils/actions";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button"
import { Loader2Icon, Trash2 } from "lucide-react"
const DeleteJobBtn = ({ id }: { id: string }) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteJobAction(id),
        onSuccess: (data) => {
            if (!data) {
                toast.error('There was an error')
                return;
            }

            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            queryClient.invalidateQueries({ queryKey: ['charts'] });

            toast.success('Job removed successfully');
        },
        });
    const handleDelete = (id: string) => {
        mutate(id);
    }

    return (
        <Button
            variant="outline"
            size={"lg"}
            onClick={() => handleDelete(id)}
            disabled={isPending}
            className="text-destructive"
        >
            {isPending ? (
                <div className="flex items-center gap-x-1">
                    <Loader2Icon className="animate-spin" />
                    Please wait
                </div>
            ) : (
                <div className="flex items-center gap-x-1">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </div>
            )}
        </Button>
    )
}

export default DeleteJobBtn