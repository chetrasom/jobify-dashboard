"use client";

import React from 'react'
import { 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarGroupLabel, 
    SidebarMenu, 
    SidebarMenuBadge, 
    SidebarMenuButton, 
    SidebarMenuItem 
} from '../ui/sidebar'
import { Button } from '../ui/button';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

type NavJobsProps = {
    items: {
        href: string;
        label: string;
        icon: React.ReactNode;
    }[]
}

const NavJobs = ({ items }: NavJobsProps) => {
    const pathname = usePathname();
    
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Jobs</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Button
                                asChild
                                key={item.href}
                                variant={pathname === item.href ? 'default' : 'link'}
                                className={`${pathname === item.href ? 'text-white' : ''} w-full justify-start h-11`}
                            >
                                <Link href={item.href} className='flex items-center gap-x-2 '>
                                    {item.icon} <span className='capitalize'>{item.label}</span>
                                </Link>
                            </Button>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default NavJobs