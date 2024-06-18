import { IOfferFilter } from "../filter/IOfferFilter";

interface IQuery {
    query: string;
    options: string[];
}

export class FilterHelper {
    static createOffersQueryWithFilters(limit: number, filters: IOfferFilter): IQuery {
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
}