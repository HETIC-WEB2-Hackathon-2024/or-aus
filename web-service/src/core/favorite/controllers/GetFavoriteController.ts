import { Request, Response } from "express";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";
import { GetFavoritesUseCase } from "../ports/GetFavoritesUseCase";

export class GetFavoriteController {
    public constructor(private readonly _useCase: GetFavoritesUseCase) { }

    public handle = async (req: Request, res: Response) => {
        try {
            const candidat_id = parseInt(req.query.candidat_id as string);
            if (!candidat_id) {
                throw new InvalidRequestError("Missing required parameters");
            }
            const favorites = await this._useCase.execute({ user_id: candidat_id });
            res.json(favorites);
        } catch (error) {
            if (error instanceof InvalidRequestError)
                res.status(400).send({ error: error.message, reason: error });
            else res.status(500).send({ error: "Internal Server Error", reason: error });
        }
    }
}
