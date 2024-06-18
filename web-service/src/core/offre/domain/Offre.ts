export class Offre {
    public constructor(
        public readonly id: number,
        public readonly secteur_id: number,
        public readonly metier_id: number,
        public readonly titre_emploi: string,
        public readonly entreprise: string,
        public readonly lieu: string,
        public readonly description_courte: string,
        public readonly contrat: string,
        public readonly type_contrat: string,
        public readonly description: string,
        public readonly commune_id: string,
        public readonly date: Date
    ) {}
}
