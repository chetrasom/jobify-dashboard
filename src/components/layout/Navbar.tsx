import React from 'react'
import { SidebarTrigger } from '../ui/sidebar';
import { UserButton } from '@clerk/nextjs';

import UserDropdown from '../navbar/UserDropdown';
import DarkModeToggle from '../navbar/DarkModeToggle';
const Navbar = () => {
    return (
        <nav className="p-4 flex items-center justify-between sticky top-0 bg-sidebar z-10">
            <div>
                <SidebarTrigger variant={'outline'} className='cursor-pointer size-8' />
            </div>

            <div className='flex items-center gap-4'>
                <DarkModeToggle />
                <UserButton />
                <UserDropdown />
            </div>
        </nav>
    )
}

export default Navbar