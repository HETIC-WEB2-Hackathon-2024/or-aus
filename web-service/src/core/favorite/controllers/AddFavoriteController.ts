import { Request, Response } from "express";
import { AddFavoriteUseCase } from "../ports/AddFavoriteUseCase";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";

export class AddFavoriteController {
  public constructor(private readonly _useCase: AddFavoriteUseCase) {
    this.handle = this.handle.bind(this);
  }

  public async handle(req: Request, res: Response): Promise<void> {
    try {
      const offreId = parseInt(req.query.offre_id as string);
      const candidatId = parseInt(req.query.candidat_id as string);
      if (!candidatId || !offreId)
        throw new InvalidRequestError("candidatId and offreId must be set");

      await this._useCase.execute(candidatId, offreId);
      res.status(201).send({ message: "Favorite added successfully" });
    } catch (error: any) {
      console.error("Error in AddFavoriteController:", error);
      if (error instanceof InvalidRequestError) {
        res.status(400).send({ error: error.message, reason: error });
      } else {
        res.status(500).send({
          error: "Internal Server Error",
          reason: error.message || error,
        });
      }
    }
  }
}
