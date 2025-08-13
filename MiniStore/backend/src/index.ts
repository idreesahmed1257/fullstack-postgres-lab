import dotenv from "dotenv";
import type { Application, Request, Response } from "express";
import express from "express";
import appRouter from "./app.route";
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT: number = 5000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello from TypeScript + Express (CommonJS Mode)!");
});

app.use("/", appRouter);

app.listen(PORT, (): void => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
