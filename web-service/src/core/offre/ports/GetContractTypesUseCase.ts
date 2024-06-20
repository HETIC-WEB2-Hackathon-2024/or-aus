import { IUseCase } from "../../../shared/IUseCase";
import { IOfferRepository } from "./IOfferRepository";
import { TContract } from "./../shared/TContract"

export class GetContractTypesUseCase implements IUseCase<{}, TContract[]> {
    public constructor(private readonly _offerRepository: IOfferRepository) {}

    public async execute(): Promise<TContract[]> {
        const contractTypes = await this._offerRepository.getContractTypes();
        return contractTypes;
    }
}
