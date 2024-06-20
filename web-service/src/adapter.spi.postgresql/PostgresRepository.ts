import { Client, Pool } from "pg";

import { Candidat, TCandidatEmail, TCandidatId } from "../core/candidat/domain/Candidat";
import {
    ICandidatCommuneOffersStatsResponse,
    ICandidatRepository,
    ICandidatSecteurOffersStatsResponse,
} from "../core/candidat/ports/ICandidatRepository";
import { Favorite, TFavoriteId } from "../core/favorite/domains/Favorite";
import { Offre } from "../core/offre/domain/Offre";
import { IOfferFilter } from "../core/offre/filter/IOfferFilter";
import { IOfferRepository } from "../core/offre/ports/IOfferRepository";
import { FilterHelper } from "../core/offre/shared/Filter-helper";
import { TContract } from "../core/offre/shared/TContract";
import { TUserPayload } from "../core/candidat/ports/GetCandidatInfoUseCase";
import { IFavoriteRepository } from "../core/favorite/ports/IFavoriteRepository";
import { RemoveFavoriteDto } from "../core/favorite/ports/RemoveFavoriteUseCase";
import { IDashboardRepository } from "../core/dashboard/ports/IDashboardRepository";
import { ISecteurRepository } from "../core/secteur/ports/ISecteurRepository";
import { Secteur } from "../core/secteur/domain/Secteur";

export class PostgresRepository
    implements IOfferRepository, ICandidatRepository, IFavoriteRepository, IDashboardRepository {
    public constructor(private readonly _pool: Pool) { }

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

    async getCandidatCandidaturesCount(input: TCandidatId): Promise<number> {
        const client = await this._pool.connect();
        try {
            const query = `SELECT 
                        COUNT(*) AS nombre
                        FROM 
                        public.offre AS o
                        JOIN 
                        public.candidat_communes AS c ON c.commune_id = o.commune_id
                        WHERE c.candidat_id = $1`;
            const {
                rows: [result],
            } = await client.query<{ nombre: number }>(query, [input.id]);

            return result.nombre;
        } finally {
            client.release();
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
                    const offre = await this.getOffers(1, 0, { id: favorite.offre_id.toString() });
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
}
