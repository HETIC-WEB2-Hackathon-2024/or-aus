import { Response } from "express";
import { RemoveFavoriteUseCase } from "../ports/RemoveFavoriteUseCase";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";
import { IController } from "../../../shared/IController";
import { TOffreId } from "../../offre/domain/Offre";

export class RemoveFavoriteController implements IController {
    public constructor(private readonly _useCase: RemoveFavoriteUseCase) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: RequestWithUserInfo, res: Response) {
        try {
            const offre_id = parseInt(req.query.offre_id as string);
            const candidat_id = req.user?.id;
            if (!offre_id || !candidat_id) {
                throw new Error("Missing required parameters");
            }
            await this._useCase.execute({
                offre_id: offre_id,
                user_id: candidat_id,
            });
            res.json({ message: "Offre retirée de la sélection" });
        } catch (error) {
            if (error instanceof Error) res.status(400).send({ error: error.message, reason: error });
        }
    }
}
