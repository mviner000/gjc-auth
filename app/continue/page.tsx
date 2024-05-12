import { Button } from "@/components/ui/moving-border";
import Link from "next/link";

const ContinuePage = () => {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-xl font-bold mb-5">You have successful login.</p>
          <Link href="/books"><Button>Continue</Button></Link>
        </div>
      </div>
    );
  };
  
  export default ContinuePage;
  