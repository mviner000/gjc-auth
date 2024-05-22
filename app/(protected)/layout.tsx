import Navbar from "@/components/navbar";

import Footer from "@/components/footer"

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <>
            <div className="h-full">
                <div className="">
                    <div className="h-screen w-full p-8 items-center justify-center">

                        {children}
                    </div>
                </div>
            </div>

            {/* <div className="mt-20">
                <Footer />
            </div> */}
        </>
    )
}

export default ProtectedLayout;