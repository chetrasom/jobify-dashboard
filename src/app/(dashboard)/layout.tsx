import React from 'react'
import AppSidebar from '@/components/layout/AppSidebar'
import Navbar from '@/components/layout/Navbar'

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppSidebar />
            <main className='w-full'>
                <Navbar />
                <div className='p-4'>{children}</div>
            </main>

        </>
    )
}
