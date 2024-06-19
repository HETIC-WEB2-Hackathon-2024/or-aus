import { Request, Response } from "express";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";
import { GetOffersUseCase } from "../ports/GetOffersUseCase";
import { IOfferFilter } from "../filter/IOfferFilter";

export class GetOffersController {
    public constructor(private readonly _useCase: GetOffersUseCase) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: Request, res: Response) {
        try {
            let limit = parseInt(req.query.limit as string);
            let offset = parseInt(req.query.offset as string);
            if (!limit) {
                limit = 50
            }
            if (!offset) {
                offset = 0
            }
            const queryString = req.query
            delete queryString.limit
            delete queryString.offset
            const filters: IOfferFilter = {
                ...queryString
            }
            const result = await this._useCase.execute({ filters, limit, offset });
            res.json(result);
        } catch (error) {
            if (error instanceof InvalidRequestError)
                res.status(400).send({ error: error.message, reason: error });
            else res.status(500).send({ error: "Internal Server Error", reason: error });
        }
    }
}
