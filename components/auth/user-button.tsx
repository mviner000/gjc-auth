"use client";

import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";

export const UserButton = () => {
    const user = useCurrentUser();
    const [imageUrl, setImageUrl] = useState(user?.image || "");

    useEffect(() => {
      if (user?.image) {
        const url = new URL(user.image);
        url.search = "";
        setImageUrl(url.toString());
      }
    }, [user?.image]);

    console.log(user?.image);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                <AvatarImage src={imageUrl} />
                    <AvatarFallback className="bg-emerald-500">
                        <FaUser className="text-white" />
                   </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <LogoutButton>
                        <div className="flex">
                        <ExitIcon className="h-4 w-4 mr-2"/>
                        Logout
                        </div>
                    </LogoutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}