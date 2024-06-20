import { IUseCase } from "../../../shared/IUseCase";
import { IOfferRepository } from "../ports/IOfferRepository";

export class AddCandidatureUseCase implements IUseCase<{ offre_id: number; user_id: number }, void> {
    public constructor(private readonly _offerRepository: IOfferRepository) {}

    async execute(input: { offre_id: number; user_id: number }): Promise<void> {
        await this._offerRepository.addCandidature(input.offre_id, input.user_id);
    }
}
