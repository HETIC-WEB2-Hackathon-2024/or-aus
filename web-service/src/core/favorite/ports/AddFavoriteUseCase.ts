import { IFavoriteRepository } from "../ports/IFavoriteRepository";

export class AddFavoriteUseCase {
    constructor(private readonly _repository: IFavoriteRepository) {}

    async execute(candidatId: number, offreId: number): Promise<void> {
        await this._repository.addFavorite(candidatId, offreId);
    }
}