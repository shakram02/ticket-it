import { Response } from "express";

export function badRequest(res: Response, obj: any) {
    res.statusCode = 400;
    res.send(obj);
}

export function ok(res: Response, obj: any) {
    res.statusCode = 200;
    res.send(obj);
}
