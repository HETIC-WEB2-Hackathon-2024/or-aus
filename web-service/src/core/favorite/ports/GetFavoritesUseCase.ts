import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../../candidat/domain/Candidat";
import { Offre } from "../../offre/domain/Offre";
import { IFavoriteRepository } from "./IFavoriteRepository";

export class GetFavoritesUseCase implements IUseCase<TCandidatId, Offre[]> {
    public constructor(private readonly _favoriteRepository: IFavoriteRepository) { }

    async execute(input: TCandidatId): Promise<Offre[]> {

        const offres = await this._favoriteRepository.getFavorites(input);

        return offres;
    }
}
