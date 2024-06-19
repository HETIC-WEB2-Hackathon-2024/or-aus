import { IUseCase } from "../../../shared/IUseCase";
import { TFavoriteId } from "../domain/Favorite";
import { IFavoriteRepository } from "./iFavorteRepository";

export class RemoveFavoriteUseCase implements IUseCase<TFavoriteId, void> {
    public constructor(private readonly _favoriteRepository: IFavoriteRepository) { }

    public async execute(input: TFavoriteId): Promise<void> {
        await this._favoriteRepository.removeFavorite(input.offre_id, input.candidat_id);
    }
}