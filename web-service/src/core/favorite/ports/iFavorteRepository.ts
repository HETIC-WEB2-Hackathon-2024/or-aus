export interface IFavoriteRepository {
    removeFavorite(offre_id: number, candidat_id: number): Promise<void>;
}
