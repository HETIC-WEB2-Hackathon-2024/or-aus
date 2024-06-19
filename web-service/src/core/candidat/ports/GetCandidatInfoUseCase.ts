import { Auth0Repository } from "../../../adapter.spi.postgresql/Auth0Repository";
import { PostgresRepository } from "../../../adapter.spi.postgresql/PostgresRepository";
import { IUseCase } from "../../../shared/IUseCase";
import { Candidat, TCandidatEmail } from "../domain/Candidat";
import { IAuth0Repository, ICandidatRepository } from "./ICandidatRepository";

export type TUserPayload = {
    sub: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: TCandidatEmail;
    email_verified: boolean;
};
export class GetCandidatInfoUseCase implements IUseCase<{ token_id: string }, { payload: any; table: Candidat }> {
    public constructor(
        private readonly _candidatInfoRepository: IAuth0Repository,
        private readonly _candidatRepository: ICandidatRepository
    ) {}
    async execute(input: { token_id: string }): Promise<{ payload: any; table: Candidat }> {
        const user_payload = await this._candidatInfoRepository.getUserInfo(input.token_id);
        const user_table = await this._candidatRepository.getCandidatInfo(user_payload.email);

        return { payload: user_payload, table: user_table };
    }
}
