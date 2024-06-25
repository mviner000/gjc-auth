interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-full">


      <div className="flex-col">
        <div className="flex h-16 items-center px-4">

          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default DashboardLayout;