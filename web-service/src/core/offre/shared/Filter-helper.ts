import { IOfferFilter } from "../filter/IOfferFilter";

interface IQuery {
    query: string;
    options: string[];
}

export class FilterHelper {
    static createOffersQueryWithFilters(limit: number, offset: number, filters: IOfferFilter): IQuery {
        let optionNumber = 3;
        const options: string[] = [limit.toString(), offset.toString()];
        let query = `SELECT * FROM offre 
        JOIN date_debut_stage ON date_debut_stage.offre_id = offre.id 
        JOIN commune ON commune.id = offre.commune_id
        JOIN secteur ON secteur.id = offre.secteur_id`;
        if (Object.keys(filters).length > 0) {
            query += ` WHERE`;
            Object.keys(filters).forEach((filter) => {
                switch (filter) {
                    case "id":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` offre.id = $${optionNumber}`;
                        optionNumber++;
                        if (filters.id) options.push(filters.id);
                        break;
                    case "metier_id":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` metier_id = $${optionNumber}`;
                        optionNumber++;
                        if (filters.metier_id) options.push(filters.metier_id);
                        break;
                    case "secteur":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` secteur = $${optionNumber}`;
                        optionNumber++;
                        if (filters.secteur) options.push(filters.secteur);
                        break;
                    case "type_contrat":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` contrat IN (`
                        const types = filters.type_contrat?.split(',')
                        types?.forEach((type, index) => {
                            console.log(types.length)
                            console.log(index)
                            if (index === types.length - 1) {
                                query +=`$${optionNumber}`;
                            } else {
                                query +=`$${optionNumber}, `;
                            }
                            options.push(type);
                            optionNumber++;
                        })
                        query += ")"
                        console.log(query)
                        break;
                    case "commune_id":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` commune_id = $${optionNumber}`;
                        optionNumber++;
                        if (filters.commune_id) options.push(filters.commune_id);
                        break;
                    case "city_or_department":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` nom_commune = $${optionNumber} OR nom_departement = $${optionNumber}`;
                        optionNumber++;
                        if (filters.city_or_department) {
                            const search = filters.city_or_department;
                            const capitalized = search.charAt(0).toUpperCase() + search.slice(1);
                            options.push(capitalized);
                        }
                        break;
                    case "entreprise":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` entreprise = $${optionNumber}`;
                        optionNumber++;
                        if (filters.entreprise) options.push(filters.entreprise);
                        break;
                    case "search":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` titre_emploi LIKE $${optionNumber}`;
                        optionNumber++;
                        if (filters.search) options.push(`%${filters.search}%`);
                        break;
                    case "period_start":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` debut_stage >= $${optionNumber}`;
                        optionNumber++;
                        if (filters.period_start) options.push(filters.period_start.toString());
                        break;
                    case "period_end":
                        if (optionNumber > 3) query += ` AND`;
                        query += ` debut_stage <= $${optionNumber}`;
                        optionNumber++;
                        if (filters.period_end) options.push(filters.period_end.toString());
                        break;
                }
            });
        }
        query += ` LIMIT $1 OFFSET $2;`;
        return { query, options };
    }
}
