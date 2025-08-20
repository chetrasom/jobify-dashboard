import { Loader2Icon } from "lucide-react"
const Loading = () => {
    return (
        <div className="flex items-center justify-center gap-2 h-screen">
            <Loader2Icon className="animate-spin size-10" />
            <h2 className='text-xl font-medium capitalize'>loading...</h2>
        </div>
    )
}

export default Loading;