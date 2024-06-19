import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Pin, Target, Bookmark, Send, Heart } from "lucide-react";

export function Dashboard() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <h1 className="text-4xl font-bold py-6">
                    Bon retour parmi nous
                    <span className="text-primary"> Florent !</span> 👋
                </h1>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-b mb-2">
                                Nouvelles offres dans votre commune
                            </CardTitle>
                            <Pin className="h-6 w-6 text-muted-foreground stroke-primary" />
                        </CardHeader>
                        <CardContent className="ml-4">
                            <div className="text-4xl font-bold text-primary">
                                24
                            </div>
                            <p className="text-md text-[#71717A] mt-2">
                                +20% par rapport au mois dernier
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-1">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-semibold mb-2">
                                Nouvelles offres dans votre secteur
                            </CardTitle>
                            <Target className="h-6 w-6 text-muted-foreground stroke-primary" />
                        </CardHeader>
                        <CardContent className="ml-4">
                            <div className="text-4xl font-bold text-primary">
                                349
                            </div>
                            <p className="text-md text-[#71717A] mt-2">
                                -11.5% par rapport au mois dernier
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-2">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-semibold mb-2">
                                Nouvelles offres enregistrées
                            </CardTitle>
                            <Bookmark className="h-6 w-6 text-muted-foreground stroke-primary" />
                        </CardHeader>
                        <CardContent className="ml-4">
                            <div className="text-4xl font-bold text-primary">
                                4
                            </div>
                            <p className="text-md text-[#71717A] mt-2">
                                -15% par rapport au mois dernier
                            </p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-3">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-semibold mb-2">
                                Candidatures envoyées
                            </CardTitle>
                            <Send className="h-6 w-6 text-muted-foreground stroke-primary" />
                        </CardHeader>
                        <CardContent className="ml-4">
                            <div className="text-4xl font-bold text-primary">
                                2
                            </div>
                            <p className="text-md text-[#71717A] mt-2">
                                -10% par rapport au mois dernier
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card
                        className="xl:col-span-2"
                        x-chunk="dashboard-01-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>
                                    Vos candidatures envoyées sur la dernière
                                    semaine
                                </CardTitle>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle className="mb-1 flex justify-between items-center">
                                Vos offres sauvegardées
                                <Heart
                                    fill="#D8AA75"
                                    className="h-7 w-7 text-muted-foreground stroke-none"
                                />
                            </CardTitle>
                            <CardDescription className="text-md">
                                Retrouvez les offres que vous avez sauvegardées
                                en un clic !
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">
                                    Développeur web (H/F)
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    Apple - CHATEAUROUX (36)
                                </CardDescription>
                            </Card>
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">
                                    Eleveur de légumes
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    Google - SANNOIS (95)
                                </CardDescription>
                            </Card>
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">
                                    Assistant marketing H/F
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    SNCF - BARD (42)
                                </CardDescription>
                            </Card>
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">
                                    Testeur d’eau H/F
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    Evian - EVIAN-LES-BAINS (74)
                                </CardDescription>
                            </Card>
                            <Card className="px-5 py-3 shadow-none">
                                <CardTitle className="text-md mb-1">
                                    Employé polyvalent
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    McDonald’s - SERRIS (77)
                                </CardDescription>
                            </Card>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
