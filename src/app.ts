import cors from "cors";
import express, { Request, Response } from "express";

import { router } from "./app/routes";
import cookieParser from "cookie-parser";
import { GlobalErrorHandler } from "./app/middleware/GlobalErrorHandler";
import NotFound from "./app/middleware/notfound";

const app = express();
app.use(cookieParser());
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
app.use(GlobalErrorHandler);
app.use(NotFound);

export default app;
