import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Building2 } from "lucide-react";

type StatsCardProps = {
    title: string;
    value: number;
};

const StatsCard = ({ title, value }: StatsCardProps) => {
    return (
        <Card className='bg-muted'>
            <CardHeader className='flex flex-row justify-between items-center'>
                <CardTitle className='capitalize font-bold text-xl lg:text-2xl items-start'>
                    <div className={`bg-primary w-14 h-14 rounded-full text-white flex items-center justify-center mb-2`}>
                        <Building2 />
                    </div>
                    {title}
                </CardTitle>
                <CardDescription className='text-4xl font-extrabold text-primary mt-[0px!important]'>
                    {value}
                </CardDescription>
            </CardHeader>
        </Card>
    )
};

export function StatsLoadingCard() {
    return (
        <Card>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div className='flex items-center space-x-4'>
                    <Skeleton className='h-12 w-12 rounded-full' />
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-[150px]' />
                        <Skeleton className='h-4 w-[100px]' />
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};

export default StatsCard;