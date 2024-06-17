import { Commune } from "../valueObjects/Commune";
import { Metier } from "../valueObjects/Metier";
import { Secteur } from "../valueObjects/Secteur";

export interface ISelectOffer {
    id: number;
    secteur: Secteur;
    metier: Metier;
    titreEmploi: string;
    entreprise: string;
    lieu: string;
    descriptionCourte: string;
    contrat: string;
    typeContrat: string;
    description: string;
    commune: Commune;
}

export class Offre {
    id: number;
    secteur: Secteur;
    metier: Metier;
    titreEmploi: string;
    entreprise: string;
    lieu: string;
    descriptionCourte: string;
    contrat: string;
    typeContrat: string;
    description: string;
    commune: Commune;

    constructor(data: ISelectOffer) {
        this.id = data.id;
        this.secteur = data.secteur;
        this.metier = data.metier;
        this.titreEmploi = data.titreEmploi;
        this.entreprise = data.entreprise;
        this.lieu = data.lieu;
        this.descriptionCourte = data.descriptionCourte;
        this.contrat = data.contrat;
        this.typeContrat = data.typeContrat;
        this.description = data.description;
        this.commune = data.commune;
    }
}
