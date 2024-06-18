import { Router } from "express";
import { GetFirstOffersUseCase } from "./core/offre/ports/GetFirstOffersUseCase";
import { pool } from "./database";
import { PostgresRepository } from "./adapter.spi.postgresql/PostgresRepository";
import { ApiServer } from "./presentation/ApiServer";
import { GetFirstOffersController } from "./core/offre/controllers/GetFirstOffersController";

export async function main(): Promise<void> {
    // Inject
    const poolClient = pool;
    const postgreRepository = new PostgresRepository(poolClient);
    const getFirstOffersUseCase = new GetFirstOffersUseCase(postgreRepository);
    const getFirstOffersController = new GetFirstOffersController(getFirstOffersUseCase);

    // Routing
    const offersRouter = Router();
    offersRouter.route("/v1/offres").get(getFirstOffersController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);

    app.listen(3000);
}

main();
