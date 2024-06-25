import { Metadata } from "next"

export const metadata: Metadata = {
    title: "GJCLibrary - Books",
    description: "Browse through the extensive collection of books at GJCLibrary. Find your next great read from a wide range of genres and authors",
}

interface BookLayoutProps {
    children: React.ReactNode
}

export default function AuthBookLayout({ children }: BookLayoutProps) {
    return (
        <>
            {children}
        </>
    )
}