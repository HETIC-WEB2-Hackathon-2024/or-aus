import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TGraphValue } from "../interfaces/dashboard.types";
import moment from "moment";
import frLocale from "moment";

interface GraphicCardProps {
    data: TGraphValue[];
    isLoading: boolean;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export const graphOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: "bottom" as const,
        },
        title: {
            display: true,
            text: "Candidatures par jour depuis les 30 derniers jours",
        },
    },
    scales: {
        y: {
            min: 0,
            suggestedMax: 5,
            ticks: {
                stepSize: 1,
            },
        },
    },
};

export default function GraphicCard({ data, isLoading }: GraphicCardProps) {

    const initData = {
        labels: data.map((x) => moment(x.date).format("MMM DD")),
        datasets: [
            {
                label: "Candidatures envoyées",
                fill: false,
                data: data.map((x) => x.value),
                borderColor: "rgb(213, 180, 98)",
                backgroundColor: "rgba(213, 180, 98, 0.5)",
            },
            {
                label: "Objectif",
                fill: true,
                backgroundColor: "rgb(255, 0, 0, 0.5)",
                borderColor: "rgba(255, 0, 0, 0.5)",
                data: Array(data.length).fill(3),
                borderDash: [5, 5],
            },
        ],
    };

    return (
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row ">
                <div className="grid gap-1">
                    <CardTitle>Vos candidatures envoyées sur la dernière semaine</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex justify-center w-full">
                <Line className="w-full" options={graphOptions} data={initData} />
            </CardContent>
        </Card>
    );
}
