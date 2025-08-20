'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type ButtonContainerProps = {
    currentPage: number;
    totalPages: number;
};

const ButtonContainer = ({ currentPage, totalPages }: ButtonContainerProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // page numbers button
    const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (page: number) => {
        const defaultParams = {
            search: searchParams.get('search') || '',
            jobStatus: searchParams.get('jobStatus') || '',
            page: String(page),
        };

        let params = new URLSearchParams(defaultParams);

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" className="border" />
                    </PaginationItem>

                    {pageButtons.map((page) => {
                        return (
                            <PaginationItem key={page}>
                                <Button
                                    key={page}
                                    size='icon'
                                    variant={currentPage === page ? 'default' : 'outline'}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </Button>
                            </PaginationItem>
                        );
                    })}

                    <PaginationItem>
                        <PaginationNext href="#" className="border" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default ButtonContainer