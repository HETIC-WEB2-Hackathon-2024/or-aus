import { IUseCase } from "../../../shared/IUseCase.js";
import { Offre } from "../../offre/domain/Offre.js";
import { IGetFavoritesDto } from "../shared/Favorites.dto.js";
import { IFavoriteRepository } from "./IFavoriteRepository.js";

export class GetFavoritesUseCase implements IUseCase<IGetFavoritesDto, Offre[]> {
    public constructor(private readonly _favoriteRepository: IFavoriteRepository) { }

    async execute(input: IGetFavoritesDto): Promise<Offre[]> {
        const offres = await this._favoriteRepository.getFavorites({ id: input.user_id });

        return offres;
    }
}