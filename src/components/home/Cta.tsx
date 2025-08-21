import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Cta = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto text-center max-w-4xl">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                    Ready to Start Your Journey?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 font-[var(--font-source-sans)] leading-relaxed">
                    Join thousands of professionals who have found their perfect career match through Jobify.
                </p>
                <Button 
                    size="lg" 
                    variant={'outline'}
                    className="h-11 capitalize"
                >
                    <Link href="/jobs" className='flex items-center'>
                        start the job <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </section>
    )
}

export default Cta