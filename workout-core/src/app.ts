import cors from "cors";
import express from "express";
import { authRouter } from "./contexts/auth/infrastructure/http/auth.router.js";
import { healthRouter } from "./contexts/shared/infrastructure/http/health.router.js";

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use(healthRouter);
