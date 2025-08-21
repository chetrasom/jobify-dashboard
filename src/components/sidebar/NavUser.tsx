"use client"
import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

import { SignOutButton, UserProfile, useUser } from "@clerk/nextjs";

type NavUserProps = {
    navUser: {
        name: string
        email: string
        avatar: string
    }
}

const NavUser = ({ navUser }: NavUserProps) => {
    const { isMobile } = useSidebar();
    const { user } = useUser();

    if (!user) return null; 

    console.log(user)
    
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-full">
                                {user?.imageUrl ? (
                                    <AvatarImage src={user.imageUrl} className="object-cover" />
                                ) : (
                                    <AvatarFallback className="rounded-lg">{user?.firstName?.[0] || "U"}</AvatarFallback>
                                )}
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.fullName}</span>
                                <span className="truncate text-xs">{user.emailAddresses[0].emailAddress}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-full">
                                    {user?.imageUrl ? (
                                        <AvatarImage src={user.imageUrl} className="object-cover" />
                                    ) : (
                                        <AvatarFallback className="rounded-lg">{user?.firstName?.[0] || "U"}</AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.fullName}</span>
                                    <span className="truncate text-xs">{user.emailAddresses[0].emailAddress}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem disabled>
                                    <Sparkles />
                                    Upgrade to Pro <small className="text-amber-500"><i>!Soon</i></small>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem disabled>
                                <BadgeCheck />
                                Account <small className="text-amber-500"><i>!Soon</i></small>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                <CreditCard />
                                Billing <small className="text-amber-500"><i>!Soon</i></small>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                <Bell />
                                Notifications <small className="text-amber-500"><i>!Soon</i></small>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <SignOutButton>
                                <div className="flex items-center text-destructive font-semibold cursor-pointer">
                                    <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                                    Logout
                                </div>
                            </SignOutButton>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default NavUser