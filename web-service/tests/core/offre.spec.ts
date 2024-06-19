import { IOfferFilter } from "../../src/core/offre/filter/IOfferFilter";
import { FilterHelper } from "../../src/core/offre/shared/Filter-helper";
import { pool } from "../../src/database";

jest.mock("../../src/database", () => {
    const pool = {
        connect: jest.fn().mockReturnValue({
            query: jest.fn(),
            release: jest.fn(),
        }),
    };
    return { pool };
});

describe("Get offers", () => {
    let mockClient: { query: jest.Mock; release: jest.Mock };
    beforeAll(() => {
        mockClient = {
            query: jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        secteur_id: 1,
                        metier_id: 1,
                        titre_emploi: "Alien",
                        entreprise: "SpaceX",
                        lieu: "Lune",
                        description_courte: "Pas de description",
                        contrat: "X",
                        type_contrat: "X",
                        description: "Pas de description",
                        commune_id: 1,
                    },
                    {
                        id: 2,
                        secteur_id: 2,
                        metier_id: 2,
                        titre_emploi: "Marchand de sable",
                        entreprise: "Sommeil",
                        lieu: "Plage",
                        description_courte: "Pas de description",
                        contrat: "X",
                        type_contrat: "X",
                        description: "Pas de description",
                        commune_id: 2,
                    },
                    {
                        id: 3,
                        secteur_id: 3,
                        metier_id: 3,
                        titre_emploi: "Développeur sans stack",
                        entreprise: "Array",
                        lieu: "LinkedList",
                        description_courte: "Pas de description",
                        contrat: "X",
                        type_contrat: "X",
                        description: "Pas de description",
                        commune_id: 3,
                    },
                ],
            }),
            release: jest.fn(),
        };
        (pool.connect as jest.Mock).mockResolvedValue(mockClient);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("Test createOffersQueryWithFilters", () => {
        it("Should create query correctly with given filters", async () => {
            const filters: IOfferFilter = {
                secteur_id: "1",
                type_contrat: "CDI",
                commune_id: "1",
                metier_id: "1",
                period_start: new Date().toISOString().split("T")[0],
                period_end: new Date().toISOString().split("T")[0],
                entreprise: "SpaceX",
                search: "Alien",
            };
            const queryWithFilters = FilterHelper.createOffersQueryWithFilters(50, 0, filters);

            expect(queryWithFilters).toHaveProperty("options");
            expect(queryWithFilters).toHaveProperty("query");
            expect(queryWithFilters.options).toEqual([
                "50",
                "0",
                "1",
                "CDI",
                "1",
                "1",
                filters.period_start,
                filters.period_end,
                "SpaceX",
                "%Alien%",
            ]);
        });
    });
});
