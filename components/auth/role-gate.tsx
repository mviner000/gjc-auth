// role-gate.tsx
"use client";

import { roleEnum } from "@/drizzle/schema"; 
import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "../form-error";

type RoleEnum = typeof roleEnum[keyof typeof roleEnum]; // Change this line

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: RoleEnum;
}

export const RoleGate = ({
    children,
    allowedRole,
}: RoleGateProps ) => {
    const role = useCurrentRole();

    if (role && role in roleEnum && roleEnum[role as keyof typeof roleEnum] === allowedRole) {
        return (
            <>
                {children}
            </>
        );
    }

    return (
        <FormError message="You're not allowed" />
    );
}