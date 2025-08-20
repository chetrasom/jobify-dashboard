"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react";
import { SignOutButton, UserProfile, useUser } from "@clerk/nextjs";

const UserDropdown = () => {
    const { user } = useUser();

    if (!user) return null; 

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full cursor-pointer">
                    <Avatar>
                        {/* <AvatarImage src="https://avatars.githubusercontent.com/u/1486366" />
                        <AvatarFallback>CN</AvatarFallback> */}

                        {user?.imageUrl ? (
                            <AvatarImage src={user.imageUrl} />
                        ) : (
                            <AvatarFallback>{user?.firstName?.[0] || "U"}</AvatarFallback>
                        )}
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10} align='end'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                        <SignOutButton>
                            <div className="flex items-center gap-2 text-destructive">
                                <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                                Logout
                            </div>
                        </SignOutButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserDropdown