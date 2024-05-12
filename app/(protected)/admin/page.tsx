"use client";

import { UserRole, roleEnum } from "@/drizzle/schema"; 
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { useCurrentRole } from "@/hooks/use-current-role";

const AdminPage = () => {
    const role = useCurrentRole();

    return (
        <div>Make this admin
            <RoleGate allowedRole={"ADMIN" as keyof typeof roleEnum}>
                <FormSuccess message="You are allowed"/>
            </RoleGate>
        </div>
    );
};

export default AdminPage;
