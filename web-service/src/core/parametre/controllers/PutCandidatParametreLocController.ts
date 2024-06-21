import { Response } from "express";
import { IController } from "../../../shared/IController";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";
import { PutCandidatParametreLocUseCase } from "../ports/PutCandidatParametreLocUseCase";

export class PutCandidatParametreLocController implements IController {
    public constructor(private readonly _useCase: PutCandidatParametreLocUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const candidat_id = req.user?.id;
            if (!candidat_id) throw new Error("Token problem, unable to obtain user ID");
            if (!req.body.nom_departement || !req.body.nom_commune) throw new Error("You must fill in the necessary information.");
            const result = await this._useCase.execute({ id: candidat_id, nom_departement: req.body.nom_departement, nom_commune: req.body.nom_commune });

            res.status(201).json();
        } catch (e) {
            if (e instanceof Error) res.status(400).send({ error: e.message, reason: e });
        }
    }
}
