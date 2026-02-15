import express from "express";
import { healthRouter } from "./contexts/shared/infrastructure/http/health.router.js";

export const app = express();

app.use(express.json());
app.use(healthRouter);
