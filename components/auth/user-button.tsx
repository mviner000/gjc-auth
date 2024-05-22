"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FidgetSpinner } from "react-loader-spinner";

import { Button } from "@/components/ui/button";
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
  const [loading, setLoading] = useState(false);

  const handleClick = (href: string) => {
    setLoading(true);
    // Simulate a delay for the loading state
    setTimeout(() => {
      window.location.href = href;
      setLoading(false);
    }, 1000);
  };

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

  return (
    <>

      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-neutral-500/50 z-50">
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass=""
            ballColors={['#ff0000', '#00ff00', '#0000ff']}
            backgroundColor="#F4442E"
          />
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={imageUrl} alt="@shadcn" />
              <AvatarFallback className="text-black dark:text-white">{getFallbackLetter()}</AvatarFallback>
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
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleClick("/profile")}>
              Profile
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleClick("/settings")}>
              Settings
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer hover:text-blue-50">
            <LogoutButton>
              <span className="hover:text-blue-500">
                Log out
              </span>
            </LogoutButton>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  )
}