import { pool } from "../../src/database";

import { PostgresRepository } from "../../src/adapter.spi.postgresql/PostgresRepository";
import { ICandidatRepository } from "../../src/core/candidat/ports/ICandidatRepository";
import { GetCandidatSecteurOffersStatsUseCase } from "../../src/core/candidat/ports/GetCandidatSecteurOffersStatsUseCase";
import { TCandidatId } from "../../src/core/candidat/domain/Candidat";

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
    let repository: ICandidatRepository;
    beforeEach(() => {
        repository = new PostgresRepository(pool);
    });

    it("should return the number of applications", async () => {
        const mockQuery = jest.fn().mockResolvedValue({ rows: [{ count: 5 }] });
        (pool.connect as jest.Mock).mockReturnValue({
            query: mockQuery,
            release: jest.fn(),
        });
        const numberOfApplications = await repository.getCandidatCandidaturesCount({ id: 10 });

        expect(pool.connect).toHaveBeenCalled();
        expect(numberOfApplications).toBe(5);
        expect((await pool.connect()).release).toHaveBeenCalled();
    });

    it("should return the -50% comparison for 5 current month / 10 previous month", async () => {
        const mockQuery = jest.fn().mockResolvedValue({ rows: [{ previous_month: 10, current_month: 5 }] });
        (pool.connect as jest.Mock).mockResolvedValue({
            query: mockQuery,
            release: jest.fn(),
        });
        const candidat_id: TCandidatId = { id: 10 };
        const offersSecteurStats = await repository.getCandidatSecteurOffersStats(candidat_id);
        const response = await new GetCandidatSecteurOffersStatsUseCase(repository).execute(candidat_id);

        expect(pool.connect).toHaveBeenCalled();
        expect(response.comparison_percentage).toBe("-50%");
        expect((await pool.connect()).release).toHaveBeenCalled();
    });
});
