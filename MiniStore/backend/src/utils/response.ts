import { Request, Response } from "express";

export const successResponse = (res: Response, data: any, message = "Success") => {
  res.json({ success: true, message, data });
};
export const errorResponse = (res: Response, error: any, status = 400) => {
  res.status(status).json({ success: false, message: error.message || error });
};
