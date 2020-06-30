import { Request, Response } from 'express';

export async function getEvents(req:Request, res:Response) {
  console.log('Requesting All events');
  res.send();
}

export async function getEvent(req:Request, res:Response) {
  console.log('Requesting:', req.params.id);
  res.send();
}
