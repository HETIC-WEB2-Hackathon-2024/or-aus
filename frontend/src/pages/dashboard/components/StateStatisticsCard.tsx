import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStatisticsCardProps {
    isError: boolean;
    errorTitle: string
}

export default function LoadingStatisticsCard({ isError = false, errorTitle }: LoadingStatisticsCardProps) {
    return (
        <Skeleton x-chunk="dashboard-0 1-chunk-1" className="flex justify-center align-center rounded-xl border shadow-md w-74 min-h-16">
            {isError && <span className="mt-auto mb-auto text-center">Statistique {errorTitle.toLocaleLowerCase()} indisponible.</span>}
        </Skeleton>
    );
}
