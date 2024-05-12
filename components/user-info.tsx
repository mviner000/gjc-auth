import { ExtendedUser } from "@/next-auth";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({
    user,
    label,
}: UserInfoProps) => {
    const userName = user?.name ?? '';
    const userEmail = user?.email ?? '';
    const userRole = user?.role ?? '';

    return (
<Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder={userName} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder={userEmail} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder={userRole} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">TwoFactor</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder={user?.isTwoFactorEnabled ? "ON" : "OFF"} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">ON</SelectItem>
                  <SelectItem value="sveltekit">OFF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Update</Button>
      </CardFooter>
    </Card>
    )
}