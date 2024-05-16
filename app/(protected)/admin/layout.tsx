import AdminHead from "@/components/admin/admin-head";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="h-full">
            <AdminHead />
            {children}
        </div>
    )
}

export default AdminLayout;