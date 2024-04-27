import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google"

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
}

export const Header = ({
    label,
}: HeaderProps ) => {
  return (
  <div className="w-full flex flex-col items-center justify-center">
      <h1 className={cn("text-2xl font-semibold",
        font.className,
    )}>
    </h1>
    <p className="text-muted-foreground text-sm">
        {label}
    </p>
  </div>
  )
}

export default Header

  