import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatRepository } from "../ports/ICandidatRepository";
import { Candidat, TCandidatId } from "../domain/Candidat";

export class UpdateCandidatUseCase
  implements IUseCase<{ id: TCandidatId["id"] } & Partial<Candidat>, void>
{
  public constructor(
    private readonly _candidatRepository: ICandidatRepository
  ) {}

  public async execute(
    input: { id: TCandidatId["id"] } & Partial<Candidat>
  ): Promise<void> {
    await this._candidatRepository.updateCandidat(input.id, input);
  }
}
