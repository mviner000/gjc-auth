"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

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

  const getFallbackLetter = () => {
    if (user?.first_name) return user.first_name.charAt(0).toUpperCase();
    if (user?.last_name) return user.last_name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U'; // Default to 'U' if all else fails
  };

  console.log(user?.image);
  return (<>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={imageUrl} alt="@shadcn" />
            <AvatarFallback>{getFallbackLetter()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Student ID: {user?.studentId}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="hover:text-blue-500" href="/dashboard">Dashboard</Link>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="hover:text-blue-500  text-white" href="/settings">Settings</Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton>
            Log out
          </LogoutButton>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  </>
  )
}