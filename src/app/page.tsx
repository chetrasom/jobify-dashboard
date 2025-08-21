import React from 'react'
import Header from '@/components/home/Header'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Footer from '@/components/home/Footer'
import JobListings from '@/components/home/JobListings'
import Cta from '@/components/home/Cta'

export default function Homepage() {
    return (
        <section className='bg-background w-full'>
            <Header />
            <Hero />
            <Features />
            <JobListings />
            <Cta />
            <Footer />
        </section>
    )
}