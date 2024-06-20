import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";
import LoadingStatisticsCard from "./LoadingStatisticsCard";

interface StatisticsCardProps {
    title: string;
    main_data: number;
    secondary_data?: [];
    comparison_data?: string;
    isLoading: boolean;
    isError: boolean;
}

export default function StatisticsCard({ title, main_data, comparison_data, isLoading, isError }: StatisticsCardProps) {
    console.log(comparison_data)
    return (
        <>
            {isLoading ? (
                <LoadingStatisticsCard isError={isError} errorTitle={title} />
            ) : (
                <Card x-chunk="dashboard-0 1-chunk-1" className="flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
                        <Target className="h-6 w-6 text-muted-foreground stroke-primary" />
                    </CardHeader>
                    <CardContent className="ml-4 h-full flex flex-col justify-between">
                        <div className="text-4xl font-bold text-primary">{main_data}</div>
                        {comparison_data && (
                            <p className="text-md text-[#71717A] mt-2">{comparison_data} par rapport au mois dernier</p>
                        )}
                    </CardContent>
                </Card>
            )}
        </>
    );
}
