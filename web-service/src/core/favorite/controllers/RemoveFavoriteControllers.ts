import { Request, Response } from "express";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";
import { RemoveFavoriteUseCase } from "../ports/RemoveFavoriteUseCase";

export class RemoveFavoriteController {
    public constructor(private readonly _useCase: RemoveFavoriteUseCase) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: Request, res: Response) {
        try {
            const offre_id = parseInt(req.query.offre_id as string);
            const candidat_id = parseInt(req.query.candidat_id as string);
            if (!offre_id || !candidat_id) {
                throw new InvalidRequestError("Missing required parameters");
            }
            await this._useCase.execute({ offre_id, candidat_id });
            res.json({ message: "Favorite removed successfully" });
        } catch (error) {
            if (error instanceof InvalidRequestError)
                res.status(400).send({ error: error.message, reason: error });
            else res.status(500).send({ error: "Internal Server Error", reason: error });
        }
    }
}
