export class Favorite {
    public constructor(
        public readonly candidat_id: number,
        public readonly offre_id: number,
        public readonly add_date: Date,
    ) { }
}

export type TFavoriteOffreId = Pick<Favorite, "offre_id">;
    