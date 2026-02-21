import bcrypt from "bcrypt";
import type { IUserRepository } from "../domain/repositories/user.repository.js";
import {
  registerUserSchema,
  type RegisterUserDto,
} from "./dtos/register-user.dto.js";

const SALT_ROUNDS = 10;

export type RegisterUserSuccess = {
  ok: true;
  message: string;
  user: { id: string; email: string; name: string };
};

export type RegisterUserDuplicateEmail = {
  ok: false;
  status: 409;
  error: string;
};

export type RegisterUserValidationFailed = {
  ok: false;
  status: 400;
  error: string;
  details: string[];
};

export type RegisterUserResult =
  | RegisterUserSuccess
  | RegisterUserDuplicateEmail
  | RegisterUserValidationFailed;

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: RegisterUserDto): Promise<RegisterUserResult> {
    const parsed = registerUserSchema.safeParse(input);
    if (!parsed.success) {
      const details = parsed.error.issues.map((e) => e.message);
      return {
        ok: false,
        status: 400,
        error: "Datos inválidos",
        details,
      };
    }

    const { email, password, name } = parsed.data;

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      return {
        ok: false,
        status: 409,
        error: "El email ya está registrado",
      };
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await this.userRepository.create({
      email,
      name,
      passwordHash,
    });

    return {
      ok: true,
      message: "Usuario registrado exitosamente",
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
