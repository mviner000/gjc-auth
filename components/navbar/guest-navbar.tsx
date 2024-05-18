import Link from "next/link";
import SearchBox from "@/components/searchbox";


const GuestNavbar = () => {
    return (
        <>
            <li className="mr-6 mt-[7px] dark:text-white">
                <Link className="hover:text-blue-500" href="/books">Books</Link>
            </li>
        </>
    );

}

export default GuestNavbar;