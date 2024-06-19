import { Candidat } from "../../candidat/domain/Candidat";
import { Offre } from "../../offre/domain/Offre";

export class Favorite {
    public constructor(
        private readonly offre_id: number,
        private readonly candidat_id: number
    ) { }
}

export type TFavoriteId = {
    offre_id: number
    candidat_id: number
};