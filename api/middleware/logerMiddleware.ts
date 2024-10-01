import { NextFunction, Request, Response } from "express";

const loger = (req: Request, res: Response, next: NextFunction) => {
  const currentTime = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const rawDate = currentTime.split('T');
  const date = rawDate[0];
  const time = rawDate[1].split('.')[0];

  console.log(`[${date} ${time}] Method: ${method}, URL: ${url}`);
  next();
}


export default loger;