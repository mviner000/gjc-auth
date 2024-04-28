import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils";
const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

import { Button } from "@/components/ui/moving-border";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});


export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-t from-emerald-600 via-50% to-emerald-700 to-70%">
      <div className="flex">
          <Image 
            width={58}
            height={58}
            src="https://img.icons8.com/3d-fluency/94/lock-2.png" 
            alt="lock-2"
          /> 
          <h1 className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className,
            )}>Auth
            </h1>
            </div>
          <p className="text-white text-lg">GJC Authentication Service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
    </main>
  );
}
