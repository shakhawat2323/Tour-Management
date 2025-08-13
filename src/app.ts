import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { router } from "./app/routes";
import { envVars } from "./app/config/env";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to my Tour management Backend Project" });
  // res.send("Welcome to my Tour management Project");
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: `Something Went Wrong !! ${err.message}`,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
});

export default app;
