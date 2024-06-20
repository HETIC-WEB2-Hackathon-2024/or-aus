import { authenticatedGet } from "@/auth/helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

import { Heart } from "lucide-react";
import StatisticsCard from "./components/StatisticsCard";
import { DashboardData, StatsEnum, StatsTitleEnum } from "./interfaces/dashboard.types";
import GraphicCard from "./components/GraphicCard";

interface DashboardProps {
    uri: string;
}

export function Dashboard({ uri }: DashboardProps) {
    const { getAccessTokenSilently, user } = useAuth0();

    // TODO: COMBINE
    const {
        data: dashboardData,
        isError,
        isLoading,
    } = useQuery<DashboardData>({
        queryKey: ["dashboardUri", uri],
        queryFn: async () => {
            return authenticatedGet(await getAccessTokenSilently(), `${uri}/dashboard`);
        },
        retryDelay: 2000,
    });

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <h1 className="text-4xl font-bold py-6">
                    Bon retour parmi nous
                    <span className="text-primary"> {user?.nickname} </span> 👋
                </h1>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <StatisticsCard
                        title={
                            dashboardData
                                ? `Nouvelles offre à ${dashboardData[StatsEnum.Commune].commune}`
                                : StatsTitleEnum.Commune
                        }
                        main_data={dashboardData?.[StatsEnum.Commune]?.current_month || 0}
                        comparison_data={dashboardData?.[StatsEnum.Commune]?.comparison_percentage}
                        isLoading={isLoading}
                        isError={isError}
                    />
                    <StatisticsCard
                        title={
                            dashboardData
                                ? `Nouvelles offre en ${dashboardData[StatsEnum.Secteur].secteur}`
                                : StatsTitleEnum.Secteur
                        }
                        main_data={dashboardData?.[StatsEnum.Secteur]?.current_month || 0}
                        comparison_data={dashboardData?.[StatsEnum.Secteur]?.comparison_percentage}
                        isLoading={isLoading}
                        isError={isError}
                    />
                    <StatisticsCard
                        title={StatsTitleEnum.Favoris}
                        main_data={dashboardData?.[StatsEnum.Favoris] || 0}
                        comparison_data={dashboardData?.[StatsEnum.Favoris]}
                        isLoading={true}
                        isError={true}
                    />
                    <StatisticsCard
                        title={StatsTitleEnum.Candidature}
                        main_data={dashboardData?.[StatsEnum.Candidature] || 0}
                        comparison_data={undefined}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <GraphicCard />
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle className="mb-1 flex justify-between items-center">
                                Vos offres sauvegardées
                                <Heart fill="#D8AA75" className="h-7 w-7 text-muted-foreground stroke-none" />
                            </CardTitle>
                            <CardDescription className="text-md">
                                Retrouvez les offres que vous avez sauvegardées en un clic !
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">Développeur web (H/F)</CardTitle>
                                <CardDescription className="text-sm">Apple - CHATEAUROUX (36)</CardDescription>
                            </Card>
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">Eleveur de légumes</CardTitle>
                                <CardDescription className="text-sm">Google - SANNOIS (95)</CardDescription>
                            </Card>
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">Assistant marketing H/F</CardTitle>
                                <CardDescription className="text-sm">SNCF - BARD (42)</CardDescription>
                            </Card>
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">Testeur d’eau H/F</CardTitle>
                                <CardDescription className="text-sm">Evian - EVIAN-LES-BAINS (74)</CardDescription>
                            </Card>
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">Employé polyvalent</CardTitle>
                                <CardDescription className="text-sm">McDonald’s - SERRIS (77)</CardDescription>
                            </Card>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
