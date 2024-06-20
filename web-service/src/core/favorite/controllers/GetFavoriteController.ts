import { Request, Response } from "express";
import { GetFavoritesUseCase } from "../ports/GetFavoritesUseCase";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";

export class GetFavoriteController {
    public constructor(private readonly _useCase: GetFavoritesUseCase) { }

    public handle = async (req: RequestWithUserInfo, res: Response) => {
        try {
            const candidat_id = req.user?.id;
            if (!candidat_id) {
                throw new Error("Missing required parameters");
            }
            const favorites = await this._useCase.execute({ id: candidat_id });
            res.json(favorites);
        } catch (error) {
            if (error instanceof Error) res.status(400).send({ error: error.message, reason: error });
        }
    };
}
