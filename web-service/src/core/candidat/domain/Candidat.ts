export class Candidat {
    public constructor(
        public readonly id: number,
        public readonly nom: string,
        public readonly prenom: string,
        public readonly telephone: string,
        public readonly email: string,
        public readonly pays: string,
        public readonly date_naissance: Date
    ) {}
}

export type TCandidatId = Pick<Candidat, "id">;
