import { pool } from "../src/database";

import { PostgresRepository } from "../src/adapter.spi.postgresql/PostgresRepository";
import { IUserRepository } from "../src/core/user/ports/IUserRepository";

jest.mock("../src/database", () => {
    const pool = {
        connect: jest.fn().mockReturnValue({
            query: jest.fn(),
            release: jest.fn(),
        }),
    };
    return { pool };
});

describe("Get number of applications", () => {
    let repository: IUserRepository;
    beforeEach(() => {
        repository = new PostgresRepository(pool);
    });

    it("should return the number of applications", async () => {
        const mockQuery = jest.fn().mockResolvedValue({ rows: [{ count: 5 }] });
        (pool.connect as jest.Mock).mockReturnValue({
            query: mockQuery,
            release: jest.fn(),
        });
        const numberOfApplications = await repository.getUserApplicationsCount({ id: 10 });

        expect(pool.connect).toHaveBeenCalled();
        expect(numberOfApplications).toBe(5);
        expect((await pool.connect()).release).toHaveBeenCalled();
    });

    it("should return the number of offers in user secteur", async () => {
        const mockQuery = jest.fn().mockResolvedValue({ rows: [{ count: 210 }] });
        (pool.connect as jest.Mock).mockResolvedValue({
            query: mockQuery,
            release: jest.fn(),
        });
        const numberOfOffersInUserSecteur = await repository.getUserApplicationsCount({ id: 10 });
        expect(pool.connect).toHaveBeenCalled();
        expect(numberOfOffersInUserSecteur).toBe(210);
        expect((await pool.connect()).release).toHaveBeenCalled();
    });
});
