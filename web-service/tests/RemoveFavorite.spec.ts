// import favorite_fixtures from "../fixtures/fixtures_favorite";
// import { PostgresRepository } from "../src/adapter.spi.postgresql/PostgresRepository";
// import { IFavoriteRepository } from "../src/core/favorite/ports/iFavorteRepository";
// import { pool } from "../src/database";

// jest.mock("../src/database", () => {
//     const originalModule = jest.requireActual("../src/database");
//     return {
//         ...originalModule,
//         pool: {
//             connect: jest.fn(),
//             end: jest.fn(),
//         },
//     };
// });

// describe("PostgresSQL Repository", () => {
//     let mockClient: { query: jest.Mock; release: jest.Mock };

//     beforeAll(() => {
//         mockClient = {
//             query: jest.fn().mockResolvedValue({}),
//             release: jest.fn(),
//         };
//     });
//     afterAll(() => {
//         jest.clearAllMocks();
//     });

//     describe("removeFavorite", () => {
//         it("should remove a favorite from the database", async () => {
//             const repository: IFavoriteRepository = new PostgresRepository(pool);
//             const { offre_id, candidat_id } = favorite_fixtures[0];

//             await repository.removeFavorite(offre_id, candidat_id);

//             expect(mockClient.query).toHaveBeenCalledWith(
//                 "DELETE FROM favorites WHERE user_id = $1 AND favorite_id = $2",
//                 [offre_id, candidat_id]
//             );
//             expect(mockClient.release).toHaveBeenCalled();
//         });
//     });

// });
