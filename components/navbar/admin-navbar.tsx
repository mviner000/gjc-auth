import Link from "next/link";
import { Button } from "@/components/ui/button";


const AdminNavbar = () => {
    return (
        <>
            <li className="mr-6 mt-[7px] dark:text-white">
                <Link className="hover:text-blue-500" href="/admin/accept/borrow">Admin</Link>
            </li>
            <li className="mr-6 mt-[7px] dark:text-white">
                <Link className="hover:text-blue-500" href="/students">Dashboard</Link>
            </li>
            <li className="mr-6 mt-[7px] dark:text-white">
                <Link className="hover:text-blue-500" href="/students">Student List</Link>
            </li>
            <li className="mr-6 mt-[7px] dark:text-white hidden md:block">
                <Link className="hover:text-blue-500" href="/auth-book">
                    <Button
                        variant="ghost"
                        className="mr-10 mt-[-2rem] text-white outline outline-[1px] outline-emerald-500"
                    >
                        Books
                    </Button>
                </Link>
            </li>
        </>
    );

}

export default AdminNavbar;