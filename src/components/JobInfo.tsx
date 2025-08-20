import { Briefcase, Clock, DollarSign, MapPin, Calendar } from "lucide-react"

type JobInfoProps = {
    icon: React.ReactNode;
    text: string;
}
const JobInfo = ({ icon, text }: JobInfoProps) => {
    return (
        <div className="flex items-center gap-2 text-sm">
            {icon}
            <span className="truncate text-foreground font-medium capitalize">{text}</span>
        </div>
    )
}

export default JobInfo