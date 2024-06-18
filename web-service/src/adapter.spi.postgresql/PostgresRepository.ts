import { Pool } from "pg";

import { Offre, TOffreId } from "../core/offre/domain/Offre";
import { IOfferFilter } from "../core/offre/filter/IOfferFilter";
import { IOfferRepository } from "../core/offre/ports/IOfferRepository";
import { TUserId } from "../core/user/domain/Utilisateur";
import { IUserRepository } from "../core/user/ports/IUserRepository";

interface IQuery {
    query: string;
    options: string[];
}

export class PostgresRepository implements IOfferRepository, IUserRepository {
    public constructor(private readonly _pool: Pool) { }

    createOffersQueryWithFilters(limit: number, filters: IOfferFilter): IQuery {
        let optionNumber = 2;
        const options: string[] = [limit.toString()];
        let query = `SELECT * FROM offre JOIN date_debut_stage ON date_debut_stage.offre_id = offre.id`;
        if (Object.keys(filters).length > 0) {
            query += ` WHERE`;
            Object.keys(filters).forEach((filter) => {
                switch (filter) {
                    case "metier_id":
                        if (optionNumber > 2) query += ` AND`;
                        query += ` metier_id = $${optionNumber}`;
                        optionNumber++;
                        if (filters.metier_id) options.push(filters.metier_id);
                        break;
                    case "secteur_id":
                        if (optionNumber > 2) query += ` AND`;
                        query += ` secteur_id = $${optionNumber}`;
                        optionNumber++;
                        if (filters.secteur_id) options.push(filters.secteur_id);
                        break;
                    case "type_contrat":
                        if (optionNumber > 2) query += ` AND`;
                        query += ` type_contrat = $${optionNumber}`;
                        optionNumber++;
                        if (filters.type_contrat) options.push(filters.type_contrat);
                        break;
                    case "commune_id":
                        if (optionNumber > 2) query += ` AND`;
                        query += ` commune_id = $${optionNumber}`;
                        optionNumber++;
                        if (filters.commune_id) options.push(filters.commune_id);
                        break;
                    case "entreprise":
                        if (optionNumber > 2) query += ` AND`;
                        query += ` entreprise = $${optionNumber}`;
                        optionNumber++;
                        if (filters.entreprise) options.push(filters.entreprise);
                        break;
                    case "search":
                        if (optionNumber > 2) query += ` AND`;
                        query += ` titre_emploi LIKE $${optionNumber}`;
                        optionNumber++;
                        if (filters.search) options.push(`%${filters.search}%`);
                        break;
                    case "period_start":
                        if (optionNumber > 2) query += ` AND`;
                        query += ` debut_stage >= $${optionNumber}`;
                        optionNumber++;
                        if (filters.period_start) options.push(filters.period_start.toString());
                        break;
                    case "period_end":
                        if (optionNumber > 2) query += ` AND`;
                        query += ` debut_stage <= $${optionNumber}`;
                        optionNumber++;
                        if (filters.period_end) options.push(filters.period_end.toString());
                        break;
                }
            });
        }
        query += ` LIMIT $1`;
        return { query, options };
    }

    async getFavoriteOffers({ id: user_id }: TUserId): Promise<Offre[]> {
        throw new Error("Method not implemented.");
    }

    async removeFavoriteOffers({ id: user_id }: TUserId, { id: offer_id }: TOffreId): Promise<Offre[]> {
        throw new Error("Method not implemented.");
    }

    async getUserApplicationsCount({ id: user_id }: TUserId): Promise<number> {
        const client = await this._pool.connect();
        try {
            const query =
                "SELECT COUNT(*) as count FROM candidat AS c JOIN candidat_offres AS co ON co.candidat_id = c.id WHERE c.id = $1;";
            const result = await client.query<{ count: number }>(query, [user_id]);
            return result.rows[0].count;
        } finally {
            client.release();
        }
    }

    async getOffers(limit: number, filters: IOfferFilter) {
        const client = await this._pool.connect();
        try {
            const queryWithFilters = this.createOffersQueryWithFilters(limit, filters);
            const results = await client.query<Offre>(queryWithFilters.query, queryWithFilters.options);
            return results.rows;
        } finally {
            client.release();
        }
    }
}
