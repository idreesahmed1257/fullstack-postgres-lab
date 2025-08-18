import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { auth } from "./auth";
import appRouter from "./app.route";

dotenv.config();

const app: Application = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", toNodeHandler(auth.handler));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express (ESM)!");
});

app.use("/", appRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
