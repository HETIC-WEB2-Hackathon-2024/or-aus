import { Offre } from "../domain/Offre";
import { IUseCase } from "../../../shared/IUseCase";
import { IOfferRepository } from "./IOfferRepository";

interface IGetFirstOffersDto {
    limit: number;
}

export class GetFirstOffersUseCase implements IUseCase<IGetFirstOffersDto, Offre[]> {
    public constructor(private readonly _offerRepository: IOfferRepository) {}

    public async execute(input: IGetFirstOffersDto): Promise<Offre[]> {
        const offersRaw = await this._offerRepository.getFirsts(input.limit);

        return offersRaw;
    }
}
