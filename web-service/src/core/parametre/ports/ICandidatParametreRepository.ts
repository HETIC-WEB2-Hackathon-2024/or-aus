import { TCandidatId } from "../../candidat/domain/Candidat";
import { CandidatParametre } from "../domains/CandidatParametre";

export interface ICandidatParametreRepository {
    getCandidatParametre(input: TCandidatId): Promise<CandidatParametre>;
    putCandidatParametreInfo(input: TCandidatId): Promise<void>;
    putCandidatParametreLoc(input: TCandidatId): Promise<void>;
    putCandidatParametrePassword(input: TCandidatId): Promise<void>;
    putCandidatParametreEmail(input: TCandidatId): Promise<void>;
    putCandidatParametreTel(input: TCandidatId): Promise<void>;
}
