import { TCandidatId } from "../../candidat/domain/Candidat.js";
import { TOffreId } from "../../offre/domain/Offre.js";

export class Favorite {
    public constructor(
        public readonly candidat_id: number,
        public readonly offre_id: number,
        public readonly add_date: Date,
    ) { }
}

export type TFavoriteId = {
    offre_id: TOffreId['id'],
    candidat_id: TCandidatId['id'],
};