import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../../../shared/IController";
import { GetUserCommuneCountUseCase } from "../ports/GetUserApplicationsCountUseCase";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";

export class GetUserCommuneCountController implements IController {
  public constructor(private readonly _useCase: GetUserCommuneCountUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      const candidat_id = parseInt(req.query.candidat_id as string);
      if (!candidat_id)
        throw new InvalidRequestError("candidat_id must be set");

      const result = await this._useCase.execute({ candidat_id });
      res.json(result);
    } catch (error) {
      if (error instanceof InvalidRequestError)
        res
          .status(parseInt(error.code))
          .send({ error: error.message, reason: error });
      else if (error instanceof Error) {
        console.error(error);
        res.status(500).send({ error: error.message, reason: error });
      }
    }
  }
}
