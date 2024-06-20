export enum StatsEnum {
    Commune = "commune_stats",
    Secteur = "secteur_stats",
    Candidature = "candidatures_stats",
    Favoris = "favorites_stats",
    Graphique = "graphique_stats",
}

export enum StatsTitleEnum {
    Commune = "Offres dans votre commune",
    Secteur = "Offres dans votre secteur",
    Candidature = "Candidatures envoyées",
    Favoris = "Offres sauvegardées",
    Graphique = "Candidatures envoyées ces derniers jours",
}

export type DashboardData = {
    [StatsEnum.Commune]: CommuneMonthlyStats;
    [StatsEnum.Secteur]: SecteurMonthlyStats;
    [StatsEnum.Candidature]: number;
    [StatsEnum.Favoris]: undefined;
    [StatsEnum.Graphique]: undefined;
};

type MonthlyStat = {
    current_month: number;
    previous_month: number;
    comparison_percentage: string;
};

export type CommuneMonthlyStats = {
    commune: string;
    code_postal: number;
} & MonthlyStat;

export type SecteurMonthlyStats = {
    secteur: string;
} & MonthlyStat;