import { Router } from "express"
import express, { NextFunction, Request, Response } from "express";
import { InvalidRequestError, auth } from "express-oauth2-jwt-bearer";

import { GetFirstOffersUseCase } from "../api/GetFirstOffersUseCase";
import { OfferRepository } from "../spi/repositories/OfferRepository";

const OffersRouter = Router();

OffersRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string);
        if (!limit) {
            throw new InvalidRequestError("limit must be set");
        }
        
        const offres = await new GetFirstOffersUseCase(new OfferRepository()).execute(limit);

        // const response = offres.map((offre) => offre.toDto());

        res.json(offres);
    } catch (error) {
        if (error instanceof InvalidRequestError)
            res.status(parseInt(error.code)).send({ error: error.message, reason: error });
        else res.status(500).send({ error: "Internal Server Error", reason: error });
    } })

export default OffersRouter