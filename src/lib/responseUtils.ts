import { Response } from 'express';

export function badRequest(res: Response, obj: any) {
  res.status(400).send(obj);
}

export function ok(res: Response, obj: any) {
  res.status(200).send(obj);
}
