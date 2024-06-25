import { MainNav } from "@/components/dashboard/main-nav"

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <>
            <div className="h-full">
                <div className="flex-col">
                    <div className="border-b">
                        <div className="flex h-16 items-center px-4">
                            <MainNav className="mx-6" />
                            <div className="ml-auto flex items-center space-x-4">
                                {/* <Search /> */}
                            </div>
                        </div>
                    </div>
                </div>
                {children}
            </div>

        </>
    )
}

export default DashboardLayout;