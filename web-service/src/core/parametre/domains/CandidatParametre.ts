import { Candidat } from "../../candidat/domain/Candidat";

export class CandidatParametre implements Candidat {
    public constructor(
        public readonly id: number,
        public readonly nom: string,
        public readonly prenom: string,
        public readonly date_naissance: Date,
        public readonly pays: string,
        public readonly nom_departement: string,
        public readonly nom_commune: string,
        public readonly email: string,
        public readonly telephone: string,
    ) { }
}

