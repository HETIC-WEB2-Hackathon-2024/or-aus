import { IUseCase } from "../../../shared/IUseCase";
import { TFavoriteId } from "../domains/Favorite.js";
import { IFavoriteRepository } from "./IFavoriteRepository";

export class RemoveFavoriteUseCase implements IUseCase<TFavoriteId, void> {
    public constructor(private readonly _favoriteRepository: IFavoriteRepository) { }

    public async execute(input: TFavoriteId): Promise<void> {
        await this._favoriteRepository.removeFavorite(input);
    }
}