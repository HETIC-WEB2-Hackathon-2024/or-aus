import { IOfferRepository } from "../../src/application/persistence/IOfferRepository";

import { PostgresRepository } from "../../src/infrastructure/spi/PostgresRepository";
import { pool } from "../../src/database";

jest.mock("../../src/database", () => {
    const originalModule = jest.requireActual("../../src/database");
    return {
        ...originalModule,
        pool: {
            connect: jest.fn(),
            end: jest.fn(),
        },
    };
});

describe("PostgresSQL Repository", () => {
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

    describe("Offer repository SPI", () => {
        it("Should get the 3 first offers and implement and dispose the pool correctly", async () => {
            const repository: IOfferRepository = new PostgresRepository(pool);
            const offersResult = await repository.getFirsts(3);

            expect(pool.connect).toHaveBeenCalled();
            expect(offersResult.length).toBe(3);
            expect(mockClient.release).toHaveBeenCalled();
        });
    });
});
