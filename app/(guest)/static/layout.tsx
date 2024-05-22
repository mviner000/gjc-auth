import Footer from "@/components/footer"
import { SideBarRight } from "@/components/sidebar-right"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "GJCLibrary",
    description: "More Info about General De Jesus College Library Website",
}

interface BookLayoutProps {
    children: React.ReactNode
}

export default function StaticLayout({ children }: BookLayoutProps) {
    return (
        <>
            <div className="">

                <div className="text-black dark:text-white text-center">

                    <div className="grid lg:grid-cols-5 ">
                        <SideBarRight className="hidden lg:block" />
                        {children}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}