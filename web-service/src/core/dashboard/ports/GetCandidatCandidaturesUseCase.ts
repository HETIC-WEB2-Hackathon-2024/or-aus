import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../../candidat/domain/Candidat";
import { ICandidatRepository } from "../../candidat/ports/ICandidatRepository";
import { IDashboardRepository, IGraphData } from "./IDashboardRepository";

export class GetCandidatCandidaturesUseCase implements IUseCase<TCandidatId, IGraphData> {
    public constructor(private readonly _candidatRepository: IDashboardRepository) {}

    public async execute(input: TCandidatId): Promise<IGraphData> {
        const data = await this._candidatRepository.getCandidatCandidatures({
            id: input.id,
        });

        return data;
    }
}
