import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons"
import { HandHelping } from 'lucide-react';

export const statuses = [
    {
        value: "borrowed",
        label: "Borrowed",
        icon: HandHelping,
    },
    {
        value: "returned",
        label: "Returned",
        icon: CheckCircledIcon,
    },
]
