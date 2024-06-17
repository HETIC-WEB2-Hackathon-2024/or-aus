import { Commune } from "../valueObjects/Commune";
import { IValueObj } from "../valueObjects/IValueObj";
import { Metier } from "../valueObjects/Metier";
import { Secteur } from "../valueObjects/Secteur";

export interface ISelectOffer {
    id: number;
    secteur: string;
    secteur_id: number;
    metier: string;
    metier_id: number;
    titre_emploi: string;
    entreprise: string;
    lieu: string;
    description_courte: string;
    contrat: string;
    type_contrat: string;
    description: string;
    commune: Commune;
}

export class OffersMapper {
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
        this.secteur = new Secteur(
            data.secteur_id,
            data.secteur
        );
        this.metier = new Metier(
            data.metier_id,
            data.metier,
        );
        this.titreEmploi = data.titre_emploi;
        this.entreprise = data.entreprise;
        this.lieu = data.lieu;
        this.descriptionCourte = data.description_courte;
        this.contrat = data.contrat;
        this.typeContrat = data.type_contrat;
        this.description = data.description;
        this.commune = data.commune;
    }
}
