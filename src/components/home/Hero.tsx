"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto text-center max-w-4xl">
                <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 dark:text-white">
                    Find Your Dream Job Today
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-[var(--font-source-sans)] leading-relaxed">
                    Connect with top employers and discover career opportunities that match your skills and aspirations. Your
                    perfect job is just a click away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                        size="lg"
                        className="h-11 cursor-pointer hover:bg-primary/90 text-white px-8 py-3"
                        asChild
                    >
                        <Link href="/stats">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="px-8 py-3 bg-transparent h-11" 
                        asChild
                    >
                        <Link href="/jobs">Browse Jobs</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Hero