"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";

type Role = "USER" | "ADMIN";

const Username = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    const [userRole, setUserRole] = useState<Role>(); 
    const user = useCurrentUser();

    useEffect(() => {
        // Update isLoggedIn and userRole when user state changes
        setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists, false otherwise
        setUserRole(user?.role as Role); // Set userRole to the user's role if user exists
    }, [user]);
    

    return (
        <>

                {isLoggedIn ? (
                        <div className="flex gap-3 mt-1">
                          {user?.first_name}
                        </div>
                        ) : (
                         
                        <div className="flex gap-3 mt-1">
                       no name
                      </div>
                        )}
              </>  
               
    )
}

export default Username;