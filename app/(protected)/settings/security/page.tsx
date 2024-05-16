import { Separator } from "@/components/ui/separator"
import { SecurityForm } from "./security-form"

export default function SecurityAppearancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Security</h3>
                <p className="text-sm text-muted-foreground">
                    Make sure password is at least 15 characters OR at least 8 characters including a number and a lowercase letter. Learn more.
                </p>
            </div>
            <Separator />
            <SecurityForm />
        </div>
    )
}