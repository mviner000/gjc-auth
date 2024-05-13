import StudentHead from "@/components/students/student-head";


interface StudentLayoutProps {
    children: React.ReactNode;
}

const StudentLayout = ({ children }: StudentLayoutProps) => {
    return (
        <div className="h-full">
           <StudentHead />
            {children}
        </div>
    )
}

export default StudentLayout;