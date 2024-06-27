import { Pool } from "pg";

import { Candidat, TCandidatEmail, TCandidatId } from "../core/candidat/domain/Candidat";
import { TUserPayload } from "../core/candidat/ports/GetCandidatInfoUseCase";
import {
    ICandidatCommuneOffersStatsResponse,
    ICandidatRepository,
    ICandidatSecteurOffersStatsResponse,
    ICandidatureStatsResponse,
} from "../core/candidat/ports/ICandidatRepository";
import { IDashboardRepository, IGraphData, TGraphValue } from "../core/dashboard/ports/IDashboardRepository";
import { Favorite } from "../core/favorite/domains/Favorite";
import { IFavoriteRepository } from "../core/favorite/ports/IFavoriteRepository";
import { RemoveFavoriteDto } from "../core/favorite/ports/RemoveFavoriteUseCase";
import { Offre } from "../core/offre/domain/Offre";
import { IOfferFilter } from "../core/offre/filter/IOfferFilter";
import { IOfferRepository } from "../core/offre/ports/IOfferRepository";
import { FilterHelper } from "../core/offre/shared/Filter-helper";
import { TContract } from "../core/offre/shared/TContract";
import { CandidatParametre } from "../core/parametre/domains/CandidatParametre";
import { TDepartement, TParamEmail, TParamInfo, TParamLoc, TParamPassword, TParamTel } from "../core/parametre/ports/ICandidatParametreRepository";
import { Secteur } from "../core/secteur/domain/Secteur";
import { ISecteurRepository } from "../core/secteur/ports/ISecteurRepository";

export class PostgresRepository
    implements IOfferRepository, ICandidatRepository, IFavoriteRepository, IDashboardRepository, ISecteurRepository {
    public constructor(private readonly _pool: Pool) { }

    async addCandidature(offre_id: number, user_id: number): Promise<void> {
        const client = await this._pool.connect();
        try {
            const values = [user_id, offre_id];

            const currentQuery = `SELECT * FROM candidat_offres WHERE candidat_id=$1 AND offre_id=$2;`;
            const {
                rows: [candidatureExists],
            } = await client.query(currentQuery, values);
            if (candidatureExists) {
                throw new Error("Candidature déjà appliquée");
            }
            const query = `
                INSERT INTO candidat_offres VALUES ($1 , $2, current_timestamp);
            `;

            await client.query(query, values);
        } finally {
            client.release();
        }
    }

    async getCandidatCandidatures(user_id: TCandidatId): Promise<IGraphData> {
        const client = await this._pool.connect();
        try {
            const queryGraph = `
            WITH date_series AS (
            SELECT generate_series(
                CURRENT_DATE - INTERVAL '30 days', 
                CURRENT_DATE, 
                '1 day'::interval
                )::date AS date
            )
            SELECT 
                ds.date,
                COALESCE(COUNT(co.*), 0) AS value
            FROM date_series ds
            LEFT JOIN candidat_offres co ON ds.date = co.date AND co.candidat_id = $1
            GROUP BY ds.date
            ORDER BY ds.date;`;
            const queryStats = `
            SELECT 
              COUNT(CASE WHEN date_trunc('month', co.date) = date_trunc('month', CURRENT_DATE) THEN 1 END) AS current_month,
              COUNT(CASE WHEN date_trunc('month', co.date) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month') THEN 1 END) AS previous_month
            FROM candidat_offres AS co
            WHERE candidat_id = $1;`;

            const { rows: graphValue } = await client.query<TGraphValue>(queryGraph, [user_id.id]);
            const {
                rows: [candidaturesStats],
            } = await client.query<ICandidatureStatsResponse>(queryStats, [user_id.id]);

            return {
                graph_data: graphValue,
                stats: {
                    previous_month: +candidaturesStats.previous_month,
                    current_month: +candidaturesStats.current_month,
                    comparison_percentage: "",
                },
            };
        } finally {
            client.release();
        }
    }

    async addCandidat(input: Pick<TUserPayload, "email">): Promise<void> {
        const client = await this._pool.connect();
        try {
            const userExists = await this.getCandidatInfo(input.email);
            if (userExists) throw new Error(`Candidat exists already`);

            const query = `
                INSERT INTO candidat (nom, prenom, telephone, email, pays, date_naissance) 
                VALUES ($1, $2, $3, $4, $5, $6);`;
            const values = [
                null, // nom
                null, // prenom
                null, // Telephone
                input.email,
                "France", // (pays)
                "2004-06-04", // (date_naissance)
            ];

            await client.query(query, values);

            return;
        } finally {
            client.release();
        }
    }

    async getCandidatInfo(input: TCandidatEmail): Promise<Candidat> {
        const client = await this._pool.connect();
        try {
            const query = `SELECT * FROM candidat WHERE email = $1`;
            const {
                rows: [result],
            } = await client.query<Candidat>(query, [input]);
            return result;
        } finally {
            client.release();
        }
    }

    async getCandidatFavoriteCount(input: TCandidatId): Promise<number> {
        const favoriteNumber = await this._pool.connect();
        try {
            const query = `SELECT 
                        COUNT(*) AS favorite_stats
                        FROM 
                        public.favorite AS f
                        WHERE f.candidat_id = $1`;
            const {
                rows: [result],
            } = await favoriteNumber.query<{ favorite_stats: number }>(query, [input.id]);

            return result.favorite_stats;
        } finally {
            favoriteNumber.release();
        }
    }

    async getCandidatSecteurOffersStats(
        input: TCandidatId
    ): Promise<Omit<ICandidatSecteurOffersStatsResponse, "comparison_percentage">> {
        const client = await this._pool.connect();
        try {
            const query = `
                SELECT
                    COUNT(CASE WHEN date_trunc('month', o.date) = date_trunc('month', CURRENT_DATE) THEN 1 END) AS current_month,
                    COUNT(CASE WHEN date_trunc('month', o.date) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month') THEN 1 END) AS previous_month,
                    s.secteur
                FROM candidat_secteurs AS cs
                JOIN offre AS o ON cs.secteur_id = o.secteur_id
                JOIN secteur AS s ON cs.secteur_id = s.id
                WHERE cs.candidat_id = $1
                GROUP BY s.secteur;`;

            const {
                rows: [result],
            } = await client.query<Omit<ICandidatSecteurOffersStatsResponse, "comparison_percentage">>(query, [
                input.id,
            ]);

            return {
                current_month: +result.current_month,
                previous_month: +result.previous_month,
                secteur: result.secteur,
            };
        } finally {
            client.release();
        }
    }

    async getFavorites(input: TCandidatId, withDependancies: boolean = true): Promise<Offre[]> {
        const client = await this._pool.connect();

        try {
            if (withDependancies) {
                const query = "SELECT * FROM favorite WHERE candidat_id = $1;";
                const result = await client.query<Favorite>(query, [input.id]);
                const offers: Offre[] = [];

                for (const favorite of result.rows) {
                    const offre = await this.getOffers(1, 0, {
                        id: favorite.offre_id.toString(),
                    });
                    offers.push(offre[0]);
                }

                return offers;
            } else {
                const query = `SELECT o.* FROM favorite AS f JOIN offre AS o ON o.id = f.offre_id WHERE f.candidat_id = $1;`;
                const { rows: result } = await client.query<Offre>(query, [input.id]);

                return result;
            }
        } finally {
            client.release();
        }
    }

    async getCandidatCommuneOffersStats(
        input: TCandidatId
    ): Promise<Omit<ICandidatCommuneOffersStatsResponse, "comparison_percentage">> {
        const client = await this._pool.connect();
        try {
            const query = `
                SELECT 
                    COUNT(CASE WHEN date_trunc('month', o.date) = date_trunc('month', CURRENT_DATE) THEN 1 END) AS current_month,
                    COUNT(CASE WHEN date_trunc('month', o.date) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month') THEN 1 END) AS previous_month,
                    co.nom_commune AS commune,
                    co.code_postal AS code_postal
                FROM candidat AS ca
                JOIN candidat_communes AS cc ON ca.id = cc.candidat_id
                JOIN commune AS co ON cc.commune_id = co.id
                JOIN offre AS o ON co.id = o.commune_id
                WHERE ca.id = $1
                GROUP BY co.nom_commune, co.code_postal;
                `;

            const {
                rows: [result],
            } = await client.query<Omit<ICandidatCommuneOffersStatsResponse, "comparison_percentage">>(query, [
                input.id,
            ]);

            return {
                current_month: +result.current_month,
                previous_month: +result.previous_month,
                commune: result.commune,
                code_postal: result.code_postal,
            };
        } finally {
            client.release();
        }
    }

    async getOffers(limit: number, offset: number, filters: IOfferFilter): Promise<Offre[]> {
        const client = await this._pool.connect();
        try {
            const queryWithFilters = FilterHelper.createOffersQueryWithFilters(limit, offset, filters);
            const results = await client.query<Offre>(queryWithFilters.query, queryWithFilters.options);
            return results.rows;
        } finally {
            client.release();
        }
    }
    async removeFavorite(input: RemoveFavoriteDto): Promise<void> {
        const client = await this._pool.connect();
        try {
            const userFavorites = await this.getFavorites({ id: input.user_id }, false);
            const userHasThisOffer = userFavorites.some((offer) => offer.id === input.offre_id);
            if (!userHasThisOffer) throw new Error("Favorite doesn't exist");

            await client.query("DELETE FROM favorite AS f WHERE f.offre_id = $1 AND f.candidat_id = $2", [
                input.offre_id,
                input.user_id,
            ]);
        } finally {
            client.release();
        }
    }

    async addFavorite(candidatId: number, offreId: number): Promise<void> {
        const client = await this._pool.connect();
        try {
            const userFavorites = await this.getFavorites({ id: candidatId }, false);
            const userHasThisOffer = userFavorites.some((offer) => offer.id === offreId);
            if (userHasThisOffer) throw new Error("Offer already favorite");

            const query = `
                    INSERT INTO favorite (candidat_id, offre_id, add_date)
                    VALUES ($1, $2, current_timestamp);`;
            await client.query(query, [candidatId, offreId]);
        } finally {
            client.release();
        }
    }

    async getContractTypes(): Promise<TContract[]> {
        const client = await this._pool.connect();
        try {
            const results = await client.query("SELECT DISTINCT contrat FROM offre", []);
            return results.rows;
        } finally {
            client.release();
        }
    }

    async getSecteursDistinct(): Promise<Secteur[]> {
        const client = await this._pool.connect();
        try {
            const results = await client.query<Secteur>("SELECT DISTINCT secteur FROM secteur", []);
            return results.rows;
        } finally {
            client.release();
        }
    }

    async getParametreLoc(): Promise<TDepartement> {
        const client = await this._pool.connect();
        try {
            const results1 = await client.query<{ nom_departement: string }>("SELECT DISTINCT nom_departement FROM commune ORDER BY nom_departement ASC;", []);
            const results = {
                noms_departement: [],
            }

            for (const result of results1.rows) {
                results.noms_departement.push(result.nom_departement as never);
            }

            return results;
        } finally {
            client.release();
        }
    }

    async getParametreSuggestedCommune(nd: string, nc: string): Promise<string[]> {
        const client = await this._pool.connect();
        try {
            const ncWithWildcard = `${nc}%`;
            const results = await client.query("SELECT DISTINCT nom_commune FROM commune WHERE nom_departement = $1 AND nom_commune LIKE $2 ORDER BY nom_commune ASC LIMIT 10", [nd, ncWithWildcard]);

            const communes: string[] = [];
            for (const c of results.rows) {
                communes.push(c.nom_commune);
            }

            return communes;
        } finally {
            client.release();
        }
    }

    async getCandidatParametre(input: TCandidatId): Promise<CandidatParametre> {
        const client = await this._pool.connect();
        try {
            const results = await client.query<CandidatParametre>("SELECT ca.id, ca.nom, ca.prenom, ca.date_naissance, ca.pays, co.nom_departement, co.nom_commune, ca.email, ca.telephone FROM candidat ca, candidat_communes cc, commune co WHERE ca.id = $1 AND ca.id = cc.candidat_id AND cc.commune_id = co.id", [input.id]);
            return results.rows[0];
        } finally {
            client.release();
        }
    }

    async putCandidatParametreInfo(input: TParamInfo): Promise<void> {
        const client = await this._pool.connect();
        try {
            await client.query<CandidatParametre>("UPDATE candidat SET nom = $1, prenom = $2, date_naissance = $3 WHERE id=$4", [input.nom, input.prenom, input.date_naissance, input.id]);
        } finally {
            client.release();
        }
    }

    async putCandidatParametreLoc(input: TParamLoc): Promise<void> {
        const client = await this._pool.connect();
        try {
            // const results = await client.query<CandidatParametre>("UPDATE candidat_communes SET commune_id = (SELECT id FROM commune WHERE nom_departement = $1 AND nom_commune = $2) WHERE id=$3", [nom_departement, nom_commune, input.id]);
        } finally {
            client.release();
        }
    }

    async putCandidatParametrePassword(input: TParamPassword): Promise<void> {
        const client = await this._pool.connect();
        try {
            throw Error('TODO');
        } finally {
            client.release();
        }
    }

    async putCandidatParametreEmail(input: TParamEmail): Promise<void> {
        const client = await this._pool.connect();
        try {
            throw Error('TODO');
            // const results = await client.query<CandidatParametre>("UPDATE candidat SET email = $1 WHERE id=$2", [email, input.id]);
        } finally {
            client.release();
        }
    }

    async putCandidatParametreTel(input: TParamTel): Promise<void> {
        const client = await this._pool.connect();
        try {
            await client.query<CandidatParametre>("UPDATE candidat SET telephone = $1 WHERE id=$2", [input.tel, input.id]);
        } finally {
            client.release();
        }
    }
}
