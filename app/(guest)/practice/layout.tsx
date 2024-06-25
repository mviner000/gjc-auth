import { ReactNode } from "react"

interface PracticeLayoutProps {
    children: ReactNode;
}

const PracticeLayout = ({ children }: PracticeLayoutProps) => {
    return (
        <>
            <h1>Hello</h1>
            {children}
        </>
    )
}

export default PracticeLayout