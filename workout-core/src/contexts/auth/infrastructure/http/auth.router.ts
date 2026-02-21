import { Prisma } from "@prisma/client";
import { Router, type Request, type Response } from "express";
import { RegisterUserUseCase } from "../../application/register-user.use-case.js";
import { createUserRepository } from "../user-repository.factory.js";

const userRepository = createUserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>;
  const input = {
    email: body?.email as string,
    password: body?.password as string,
    name: body?.name as string,
  };

  try {
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
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      res.status(409).json({ error: "El email ya está registrado" });
      return;
    }
    throw err;
  }

  res.status(500).json({ error: "Internal server error" });
});
