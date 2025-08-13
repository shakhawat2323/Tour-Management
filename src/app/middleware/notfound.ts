import { Request, Response } from "express";
import httpStatus from "http-status-codes";
const NotFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route NOT_FOUND",
  });
};

export default NotFound;
