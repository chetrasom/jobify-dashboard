"use client";

import { useQuery } from "@tanstack/react-query";
import { getChartsDataAction } from "@/utils/actions";
import BarChartCard from "./BarChartCard";
const ChartsContainer = () => {
    // const { data, isPending } = useQuery({
    //     queryKey: ['charts'],
    //     queryFn: () => getChartsDataAction(),
    // });

    // console.log(data)

    // if (isPending) return <h2 className='text-xl font-medium'>Please wait...</h2>;

    // if (!data || data.length < 1) return null;

    return (
        <section className="mt-10">
            <h1 className='text-2xl lg:text-3xl font-bold text-center mb-8'>
                Monthly Applications
            </h1>

            {/* Use temporary data first. because data chart is small */}
            <BarChartCard />
        </section>
    )
}

export default ChartsContainer