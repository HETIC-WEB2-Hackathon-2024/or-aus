import { Response } from "express";
import { AddFavoriteUseCase } from "../ports/AddFavoriteUseCase";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";

export class AddFavoriteController {
    public constructor(private readonly _useCase: AddFavoriteUseCase) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: RequestWithUserInfo, res: Response): Promise<void> {
        try {
            const offreId = parseInt(req.query.offre_id as string);
            const candidatId = req.user?.id;
            if (!candidatId || !offreId) throw new Error("candidatId and offreId must be set");

            await this._useCase.execute(candidatId, offreId);
            res.status(201).send({ message: "Offre enregistrée" });
        } catch (error: any) {
            console.error("Error in AddFavoriteController:", error);
            if (error instanceof Error) {
                res.status(400).send({ error: error.message, reason: error });
            }
        }
    }
}
