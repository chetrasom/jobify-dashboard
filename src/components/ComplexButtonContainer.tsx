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
import { ChevronsLeft, ChevronsRight } from "lucide-react";

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
                className='cursor-pointer size-10 dark:text-white'
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
                <Button size='icon' variant='outline' key='dots-1' className='size-10'>
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
                <Button size='icon' variant='outline' key='dots-2' className='size-10'>
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
                <PaginationContent className='flex flex-wrap gap-x-1.5 gap-y-2.5 md:gap-x-2'>
                    <PaginationItem>
                        <Button
                            className='flex items-center gap-x-2 capitalize cursor-pointer h-10'
                            variant='outline'
                            onClick={() => {
                                let prevPage = currentPage - 1;
                                if (prevPage < 1) prevPage = totalPages;
                                handlePageChange(prevPage);
                            }}
                        >
                            <ChevronLeft />
                            <span className='hidden md:inline-flex'>previous</span>
                        </Button>
                    </PaginationItem>
                    
                    {renderPageButtons()}

                    <PaginationItem>
                        <Button
                            className='flex items-center gap-x-2 capitalize cursor-pointer h-10'
                            onClick={() => {
                                let nextPage = currentPage + 1;
                                if (nextPage > totalPages) nextPage = 1;
                                handlePageChange(nextPage);
                            }}
                            variant='outline'
                        >
                            <span className='hidden md:inline-flex'>next</span>
                            <ChevronRight />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default ComplexButtonContainer