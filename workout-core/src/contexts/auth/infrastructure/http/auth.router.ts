import { Router, type Request, type Response } from "express";
import { RegisterUserUseCase } from "../../application/register-user.use-case.js";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository.js";

const userRepository = new InMemoryUserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>;
  const input = {
    email: body?.email as string,
    password: body?.password as string,
    name: body?.name as string,
  };

  const result = await registerUserUseCase.execute(input);

  if (result.ok) {
    res.status(200).json({
      message: result.message,
      user: result.user,
    });
    return;
  }

  if (result.status === 409) {
    res.status(409).json({ error: result.error });
    return;
  }

  if (result.status === 400) {
    res.status(400).json({ error: result.error, details: result.details });
    return;
  }

  res.status(500).json({ error: "Internal server error" });
});
