import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to my Tour management Backend Project" });
  // res.send("Welcome to my Tour management Project");
});

export default app;
