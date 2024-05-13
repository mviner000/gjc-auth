import { useSession } from "next-auth/react";
import { UserRole, roleEnum } from "@/drizzle/schema";

export const useCurrentRole = () => {
    const session = useSession();

    if (!session.data?.user) {
        return undefined;
    }

    const role = session.data.user.role;

    return Object.values(roleEnum).indexOf(role as keyof typeof roleEnum);
}