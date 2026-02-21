import { z } from "zod";

export const registerUserSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido")
    .transform((v) => v.trim().toLowerCase()),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .transform((v) => v.trim()),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;

export type RegisterUserValidationError = {
  error: string;
  details: string[];
};
