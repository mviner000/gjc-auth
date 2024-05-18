import Link from "next/link";
import SearchBox from "@/components/searchbox";


const StudentNavbar = () => {
    return (
        <>

            <li className="mr-6 mt-[7px] dark:text-white">
                <Link className="hover:text-blue-500" href="/books/table">Books</Link>
            </li>
            <li className="mr-6 mt-[7px] dark:text-white">
                <Link className="hover:text-blue-500" href="/students/return">Profile</Link>
            </li>

        </>
    );

}

export default StudentNavbar;