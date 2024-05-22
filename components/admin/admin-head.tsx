"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { roleEnum } from "@/drizzle/schema"; // Import the roleEnum from your schema
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type Role = "USER" | "ADMIN";

const AdminHead = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<Role>();
    const role = useCurrentRole();
    const user = useCurrentUser();

    useEffect(() => {
        // Update isLoggedIn and userRole when user state changes
        setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists, false otherwise
        setUserRole(user?.role as Role); // Set userRole to the user's role if user exists
    }, [user]);

    return (
        <div className="mb-5">
            {isLoggedIn ? (
                <div>
                    {userRole === 'ADMIN' && (
                        <>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/admin/accept/borrow">Borrowers</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />

                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/admin/accept/return">Returners</BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator />

                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/transaction">All Book Transaction</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </>
                    )}
                    {/* Add additional role-based rendering logic here */}
                </div>
            ) : (
                <p>You are not logged in. Please log in to view this page.</p>
            )}
        </div>
    );
}

export default AdminHead;