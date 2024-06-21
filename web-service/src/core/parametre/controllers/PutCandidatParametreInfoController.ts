import { Response } from "express";
import { IController } from "../../../shared/IController";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";
import { PutCandidatParametreInfoUseCase } from "../ports/PutCandidatParametreInfoUseCase";

export class PutCandidatParametreInfoController implements IController {
    public constructor(private readonly _useCase: PutCandidatParametreInfoUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const candidat_id = req.user?.id;
            if (!candidat_id) throw new Error("Token problem, unable to obtain user ID");
            if (!req.body.nom || !req.body.prenom || !req.body.date_naissance) throw new Error("You must fill in the necessary information.");
            console.log(req.body.nom, req.body.prenom, req.body.date_naissance)
            await this._useCase.execute({ id: candidat_id, nom: req.body.nom, prenom: req.body.prenom, date_naissance: req.body.date_naissance });

            res.status(201).json();
        } catch (e) {
            if (e instanceof Error) res.status(400).send({ error: e.message, reason: e });
        }
    }
}
