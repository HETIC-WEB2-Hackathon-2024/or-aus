import { Auth0Repository } from "../../../adapter.spi.postgresql/Auth0Repository";
import { PostgresRepository } from "../../../adapter.spi.postgresql/PostgresRepository";
import { IUseCase } from "../../../shared/IUseCase";
import { Candidat, TCandidatEmail } from "../domain/Candidat";
import { IAuth0Repository, ICandidatRepository } from "./ICandidatRepository";

export type TUserPayload = {
    name: string;
    email: TCandidatEmail;
};
export class GetCandidatInfoUseCase implements IUseCase<{ token_id: string }, any> {
    public constructor(
        private readonly _candidatInfoRepository: IAuth0Repository,
        private readonly _candidatRepository: ICandidatRepository
    ) {}

    async execute(input: { token_id: string }): Promise<any> {
        try {
            const user_payload = await this._candidatInfoRepository.getUserInfo(input.token_id);
            const user_table = await this._candidatRepository.getCandidatInfo(user_payload.email);

            return user_table;
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
