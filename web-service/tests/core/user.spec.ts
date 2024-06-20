import { pool } from "../../src/database";

import { PostgresRepository } from "../../src/adapter.spi.postgresql/PostgresRepository";
import { GetCandidatSecteurOffersStatsUseCase } from "../../src/core/dashboard/ports/GetCandidatSecteurOffersStatsUseCase";
import { TCandidatId } from "../../src/core/candidat/domain/Candidat";
import { GetCandidatCommuneOffersStatsUseCase } from "../../src/core/dashboard/ports/GetCandidatCommuneOffersStatsUseCase";
import { IDashboardRepository } from "../../src/core/dashboard/ports/IDashboardRepository";

jest.mock("../../src/database", () => {
    const pool = {
        connect: jest.fn().mockReturnValue({
            query: jest.fn(),
            release: jest.fn(),
        }),
    };
    return { pool };
});

describe("Get number of applications", () => {
    let repository: IDashboardRepository;
    beforeEach(() => {
        repository = new PostgresRepository(pool);
    });

    // it("should return the number of applications", async () => {
    //     const mockQuery = jest.fn().mockResolvedValue({ rows: [{ count: 5 }] });
    //     (pool.connect as jest.Mock).mockReturnValue({
    //         query: mockQuery,
    //         release: jest.fn(),
    //     });
    //     const numberOfApplications = await repository.getCandidatCandidaturesCount({ id: 10 });

    //     expect(pool.connect).toHaveBeenCalled();
    //     expect(numberOfApplications).toBe(5);
    //     expect((await pool.connect()).release).toHaveBeenCalled();
    // });

    it("should return the -50.00% comparison for 5 current month / 10 previous month", async () => {
        const mockQuery = jest
            .fn()
            .mockResolvedValue({ rows: [{ previous_month: 10, current_month: 5, secteur: "Défense" }] });
        (pool.connect as jest.Mock).mockResolvedValue({
            query: mockQuery,
            release: jest.fn(),
        });
        const candidat_id: TCandidatId = { id: 10 };
        const response = await new GetCandidatSecteurOffersStatsUseCase(repository).execute(candidat_id);

        expect(pool.connect).toHaveBeenCalled();
        expect(response.comparison_percentage).toBe("-50%");
        expect((await pool.connect()).release).toHaveBeenCalled();
    });

    it("should return -30.00% for 7 / 10", async () => {
        const mockQuery = jest.fn().mockResolvedValue({
            rows: [{ previous_month: 10, current_month: 7, commune: "Aiguebelette-le-Lac", code_postal: 73610 }],
        });
        (pool.connect as jest.Mock).mockResolvedValue({
            query: mockQuery,
            release: jest.fn(),
        });

        const candidat_id: TCandidatId = { id: 10 };
        const response = await new GetCandidatCommuneOffersStatsUseCase(repository).execute(candidat_id);

        expect(pool.connect).toHaveBeenCalled();
        expect(response.comparison_percentage).toBe("-30%");
        expect((await pool.connect()).release).toHaveBeenCalled();
    });
});
