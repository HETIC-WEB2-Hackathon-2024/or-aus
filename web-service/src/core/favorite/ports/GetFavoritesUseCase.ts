import { IUseCase } from "../../../shared/IUseCase";
import { Offre } from "../../offre/domain/Offre";
import { IGetFavoritesDto } from "../shared/Favorites.dto";
import { IFavoriteRepository } from "./IFavoriteRepository";

export class GetFavoritesUseCase implements IUseCase<IGetFavoritesDto, Offre[]> {
    public constructor(private readonly _favoriteRepository: IFavoriteRepository) {}

    async execute(input: IGetFavoritesDto): Promise<Offre[]> {
        const offres = await this._favoriteRepository.getFavorites({ email: input.user_email });

        return offres;
    }
}
