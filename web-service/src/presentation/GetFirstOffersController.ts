import { Request, Response } from "express";
import { GetFirstOffersUseCase } from "../application/api/GetFirstOffersUseCase";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";

export class GetFirstOffersController {
    public constructor(private readonly _useCase: GetFirstOffersUseCase) {}

    public async handle(req: Request, res: Response) {
        try {
            const limit = parseInt(req.body.limit);
            if (!limit) throw new InvalidRequestError("limit must be set");

            const result = await this._useCase.execute({ limit });
            res.json(result);
        } catch (error) {
            if (error instanceof InvalidRequestError)
                res.status(parseInt(error.code)).send({ error: error.message, reason: error });
            else res.status(500).send({ error: "Internal Server Error", reason: error });
        }
    }
}
