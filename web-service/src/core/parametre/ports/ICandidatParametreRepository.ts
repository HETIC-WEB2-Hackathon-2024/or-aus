import { TCandidatId } from "../../candidat/domain/Candidat";
import { CandidatParametre } from "../domains/CandidatParametre";

export type TParamInfo = TCandidatId & {
    nom: string,
    prenom: string,
    date_naissance: string,
}

export type TParamLoc = TCandidatId & {
    nom_departement: string,
    nom_commune: string,
}

export type TParamPassword = TCandidatId & {
    password: string,
}

export type TParamEmail = TCandidatId & {
    email: string,
}

export type TParamTel = TCandidatId & {
    tel: string,
}

export type TDepartement = {
    noms_departement: string[],
}

export interface ICandidatParametreRepository {
    getCandidatParametre(input: TCandidatId): Promise<CandidatParametre>;
    getParametreLoc(): Promise<TDepartement>;
    getParametreSuggestedCommune(nd: string, nc: string): Promise<string[]>;
    putCandidatParametreInfo(input: TParamInfo): Promise<void>;
    putCandidatParametreLoc(input: TParamLoc): Promise<void>;
    putCandidatParametrePassword(input: TParamPassword): Promise<void>;
    putCandidatParametreEmail(input: TParamEmail): Promise<void>;
    putCandidatParametreTel(input: TParamTel): Promise<void>;
}