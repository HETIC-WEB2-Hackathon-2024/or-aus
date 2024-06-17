import { Commune } from "../valueObjects/Commune";
import { IValueObj } from "../valueObjects/IValueObj";
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

export class Offre implements IValueObj {
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

    toDto() {
        return {
            id: this.id,
            secteur: this.secteur.toDto(),
            metier: this.metier.toDto(),
            titreEmploi: this.titreEmploi,
            entreprise: this.entreprise,
            lieu: this.lieu,
            descriptionCourte: this.descriptionCourte,
            contrat: this.contrat,
            typeContrat: this.typeContrat,
            description: this.description,
            commune: this.commune.toDto(),
        };
    }
}
