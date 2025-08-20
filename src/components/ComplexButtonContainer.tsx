'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from './ui/button';
import { buttonVariants } from "@/components/ui/button";
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

type ButtonProps = {
    page: number;
    activeClass: boolean;
};

const ComplexButtonContainer = ({ currentPage, totalPages }: ButtonContainerProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (page: number) => {
        const defaultParams = {
            search: searchParams.get('search') || '',
            jobStatus: searchParams.get('jobStatus') || '',
            page: String(page),
        };

        let params = new URLSearchParams(defaultParams);

        router.push(`${pathname}?${params.toString()}`);
    };

    // Add page
    const addPageButton = ({ page, activeClass }: ButtonProps) => {
        return (
            <Button
                key={page}
                size='icon'
                variant={activeClass ? 'default' : 'outline'}
                onClick={() => handlePageChange(page)}
                className='cursor-pointer'
            >
                {page}
            </Button>
        );
    };

    // Render pages button
    const renderPageButtons = () => {
        const pageButtons = [];

        // first page
        pageButtons.push(
            addPageButton({ page: 1, activeClass: currentPage === 1 })
        );

        // dots
        if (currentPage > 3) {
            pageButtons.push(
                <Button size='icon' variant='outline' key='dots-1'>
                ...
                </Button>
            );
        }

        // one before current page
        if (currentPage !== 1 && currentPage !== 2) {
            pageButtons.push(
                addPageButton({
                    page: currentPage - 1,
                    activeClass: false,
                })
            );
        }

        // current page
        if (currentPage !== 1 && currentPage !== totalPages) {
            pageButtons.push(
                addPageButton({
                    page: currentPage,
                    activeClass: true,
                })
            );
        }

        // one after current page
        if (currentPage !== totalPages && currentPage !== totalPages - 1) {
            pageButtons.push(
                addPageButton({
                    page: currentPage + 1,
                    activeClass: false,
                })
            );
        }

        if (currentPage < totalPages - 2) {
            pageButtons.push(
                <Button size='icon' variant='outline' key='dots-2'>
                ...
                </Button>
            );
        }

        pageButtons.push(
            addPageButton({
                page: totalPages,
                activeClass: currentPage === totalPages,
            })
        );

        return pageButtons;
    };

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <Button
                            className='flex items-center gap-x-2 capitalize cursor-pointer'
                            variant='outline'
                            onClick={() => {
                                let prevPage = currentPage - 1;
                                if (prevPage < 1) prevPage = totalPages;
                                handlePageChange(prevPage);
                            }}
                        >
                            <ChevronLeft />
                            previous
                        </Button>
                    </PaginationItem>

                    {renderPageButtons()}

                    <PaginationItem>
                        <Button
                            className='flex items-center gap-x-2 capitalize cursor-pointer'
                            onClick={() => {
                                let nextPage = currentPage + 1;
                                if (nextPage > totalPages) nextPage = 1;
                                handlePageChange(nextPage);
                            }}
                            variant='outline'
                        >
                            next
                            <ChevronRight />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default ComplexButtonContainer