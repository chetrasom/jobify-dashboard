import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const SectionCards = () => {
    return (
        <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
            <Card className='bg-muted'>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle className='capitalize text-2xl font-bold lg:text-[28px]'>Pending Job</CardTitle>
                    <CardDescription className='text-4xl font-extrabold text-primary mt-[0px!important]'>
                        29
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className='bg-muted'>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle className='capitalize text-2xl font-bold lg:text-[28px]'>Pending Job</CardTitle>
                    <CardDescription className='text-4xl font-extrabold text-primary mt-[0px!important]'>
                        29
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className='bg-muted'>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle className='capitalize text-2xl font-bold lg:text-[28px]'>Pending Job</CardTitle>
                    <CardDescription className='text-4xl font-extrabold text-primary mt-[0px!important]'>
                        29
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}

export default SectionCards