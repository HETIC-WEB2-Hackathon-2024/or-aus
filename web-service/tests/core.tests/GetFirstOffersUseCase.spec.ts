import { IOfferRepository } from "../../src/core/ports/persistence/IOfferRepository";
import { pool } from "../../src/database";
import { OfferRepository } from "../../src/infrastructure/spi/OfferRepository";

jest.mock("../../src/database", () => {
    const originalModule = jest.requireActual("../../src/database");
    return {
        ...originalModule,
        pool: {
            connect: jest.fn(),
            end: jest.fn(),
        },
        query: jest.fn(),
    };
});
describe("Get first offers use case", () => {
    let mockClient: { query: any; release: any };

    beforeAll(() => {
        mockClient = {
            query: jest.fn().mockResolvedValue({
                rows: [
                    {
                        id: 1,
                        secteur: "secteur1",
                        metier: "metier1",
                        titreEmploi: "Job 1",
                        entreprise: "Company 1",
                        lieu: "Location 1",
                        descriptionCourte: "Short Desc 1",
                        contrat: "Contract 1",
                        typeContrat: "Type 1",
                        description: "Description 1",
                        commune: "Commune 1",
                    },
                    {
                        id: 2,
                        secteur: "secteur2",
                        metier: "metier2",
                        titreEmploi: "Job 2",
                        entreprise: "Company 2",
                        lieu: "Location 2",
                        descriptionCourte: "Short Desc 2",
                        contrat: "Contract 2",
                        typeContrat: "Type 2",
                        description: "Description 2",
                        commune: "Commune 2",
                    },
                    {
                        id: 3,
                        secteur: "secteur3",
                        metier: "metier3",
                        titreEmploi: "Job 3",
                        entreprise: "Company 3",
                        lieu: "Location 3",
                        descriptionCourte: "Short Desc 3",
                        contrat: "Contract 3",
                        typeContrat: "Type 3",
                        description: "Description 3",
                        commune: "Commune 3",
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

    it("Should get 3 first offers", async () => {
        const offerRepository: IOfferRepository = new OfferRepository();
        const offersRaw = await offerRepository.getFirstOffers(3);
        expect(offersRaw.length).toBe(3);
        expect(mockClient.release).toHaveBeenCalled();
    });
});
