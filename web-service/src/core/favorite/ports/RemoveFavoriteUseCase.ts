import { IUseCase } from "../../../shared/IUseCase";
import { IFavoriteRepository } from "./IFavoriteRepository";

export type RemoveFavoriteDto = {
    offre_id: number;
    user_id: number;
};
export class RemoveFavoriteUseCase implements IUseCase<RemoveFavoriteDto, void> {
    public constructor(private readonly _favoriteRepository: IFavoriteRepository) { }

    public async execute(input: RemoveFavoriteDto): Promise<void> {
        await this._favoriteRepository.removeFavorite(input);
    }
}
