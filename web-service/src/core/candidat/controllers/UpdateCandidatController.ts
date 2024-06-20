import { Request, Response } from "express";
import { UpdateCandidatUseCase } from "../ports/UpdateCandidatUseCase";
import { Candidat, TCandidatId } from "../domain/Candidat";
import { RequestWithUserInfo } from "./GetCandidatInfoMiddleware";

export class UpdateCandidatController {
  public constructor(private readonly _useCase: UpdateCandidatUseCase) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: RequestWithUserInfo, res: Response): Promise<void> {
    try {
      const candidatId: number = parseInt(req.query.id as string, 10);
      if (isNaN(candidatId)) {
        throw new Error("Invalid candidat ID");
      }
      const candidatData: Partial<Candidat> = {
        nom: req.query.nom as string,
        prenom: req.query.prenom as string,
        telephone: req.query.telephone as string,
        email: req.query.email as string,
        pays: req.query.pays as string,
        date_naissance: req.query.date_naissance
          ? new Date(req.query.date_naissance as string)
          : undefined,
      };
      await this._useCase.execute({ id: candidatId, ...candidatData });
      res.status(200).send({ message: "Profile updated successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ error: error.message, reason: error });
      } else {
        res.status(500).send({ error: "Internal Server Error" });
      }
    }
  }
}
