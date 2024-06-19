import { IFavoriteRepository } from "./IFavoriteRepository";

export class AddFavoriteUseCase {
    constructor(private readonly _repository: IFavoriteRepository) {}

    async execute(candidatId: number, offreId: number, candidatEmail: string): Promise<void> {
        await this._repository.addFavorite(candidatId, offreId, candidatEmail);
    }
}
