import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { InvalidRequestError, auth } from "express-oauth2-jwt-bearer";

import { GetFirstOffersUseCase } from "./infrastructure/api/GetFirstOffersUseCase";
import { OfferRepository } from "./infrastructure/spi/OfferRepository";

const port = 3000;
const app = express();

// make sure we hare handling CORS properly
// See more on CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

const jwtCheck = auth({
    audience: "api.aus.floless.fr",
    issuerBaseURL: "https://adopte-un-stagiaire.eu.auth0.com/",
    tokenSigningAlg: "RS256",
});

// enforce that all incoming requests are authenticated
app.use(jwtCheck);

app.get("/v1/offres", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const limit = parseInt(req.body.limit as string);
        if (!limit) {
            throw new InvalidRequestError("limit must be set");
        }

        const offres = await new GetFirstOffersUseCase(new OfferRepository()).execute(limit);

        const response = offres.map((offre) => offre.toDto());

        res.json(response);
    } catch (error) {
        if (error instanceof InvalidRequestError)
            res.status(parseInt(error.code)).send({ error: error.message, reason: error });
        else res.status(500).send({ error: "Internal Server Error", reason: error });
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
