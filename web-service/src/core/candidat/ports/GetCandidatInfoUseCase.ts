import { IUseCase } from "../../../shared/IUseCase";
import { IAuth0Repository, ICandidatRepository } from "./ICandidatRepository";

export class GetCandidatInfoUseCase implements IUseCase<{ token_id: string }, any> {
    public constructor(private readonly _candidatRepository: IAuth0Repository) {}

    async execute(input: { token_id: string }): Promise<any> {
        try {
            const res = await this._candidatRepository.getUserInfo(input.token_id);
            return res;
        } catch (e) {
            if (e instanceof Error) {
                return {
                    error: e.message,
                    reason: e,
                };
            }
        }
    }
}
