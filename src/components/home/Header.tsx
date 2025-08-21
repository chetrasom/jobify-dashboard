"use client";

import React from 'react'
import { Button } from '../ui/button'
import { Briefcase } from 'lucide-react'
import DarkModeToggle from '../navbar/DarkModeToggle';
import { HomeIcon } from "lucide-react";
import Link from 'next/link';

const Header = () => {
    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
            <div className="container flex items-center justify-between py-4">
                <div className="flex items-center space-x-2">
                    <Briefcase className="h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-bold">Jobify</h1>
                </div>

                <div className='flex items-center gap-x-6'>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#" className='text-primary hover:text-primary transition-colors'>
                            <HomeIcon />
                        </a>
                        <a
                            href="#features"
                            className="text-muted-foreground hover:text-primary transition-colors font-[var(--font-source-sans)]"
                        >
                            Features
                        </a>
                        <a
                            href="#opportunities"
                            className="text-muted-foreground hover:text-primary transition-colors font-[var(--font-source-sans)]"
                        >
                            Opportunities
                        </a>
                        <a
                            href="#contact"
                            className="text-muted-foreground hover:text-primary transition-colors font-[var(--font-source-sans)]"
                        >
                            Contact
                        </a>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={"/stats"}>Sign In</Link>  
                        </Button>
                    </nav>
                    
                    <DarkModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header