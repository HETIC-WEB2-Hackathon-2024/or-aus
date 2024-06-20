import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../../candidat/domain/Candidat";
import { ICandidatRepository } from "../../candidat/ports/ICandidatRepository";
import { IDashboardRepository } from "./IDashboardRepository";

export class GetCandidatFavoriteCountUseCase implements IUseCase<TCandidatId, number> {
    public constructor(private readonly _ICandidatRepository: IDashboardRepository) {}

    public async execute(input: TCandidatId): Promise<number> {
        return await this._ICandidatRepository.getCandidatFavoriteCount({
            id: input.id,
        });
    }
}
