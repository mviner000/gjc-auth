import Navbar from "@/components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full">
            <Navbar />
        <div className="h-full w-full p-8 items-center justify-center bg-sky-500">
           
            {children}
        </div>
        </div>
    )
}

export default ProtectedLayout;