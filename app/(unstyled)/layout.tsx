import Navbar from "@/components/navbar";

import Footer from "@/components/footer"

interface UnstyledLayoutProps {
    children: React.ReactNode;
}

const UnstyledLayout = ({ children }: UnstyledLayoutProps) => {
    return (
        <>
            <div className="h-full">
                <div className="">
                    <div className="h-screen w-full p-8 items-center justify-center">
                        {children}
                    </div>
                </div>
            </div>

        </>
    )
}

export default UnstyledLayout;