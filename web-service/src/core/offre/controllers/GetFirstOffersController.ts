import { Request, Response } from "express";
import { GetFirstOffersUseCase } from "../ports/GetFirstOffersUseCase";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";
import { IUseCase } from "../../../shared/IUseCase";

export class GetFirstOffersController {
    public constructor(private readonly _useCase: GetFirstOffersUseCase) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: Request, res: Response) {
        try {
            const limit = parseInt(req.query.limit as string);
            if (!limit) throw new InvalidRequestError("limit must be set");

            const result = await this._useCase.execute({ limit });
            res.json(result);
        } catch (error) {
            if (error instanceof InvalidRequestError)
                res.status(parseInt(error.code)).send({ error: error.message, reason: error });
            else if (error instanceof Error) {
                console.error(error);
                res.status(500).send({ error: error.message, reason: error });
            }
        }
    }
}
