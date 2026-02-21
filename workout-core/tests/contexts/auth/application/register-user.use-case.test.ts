import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUserUseCase } from "../../../../src/contexts/auth/application/register-user.use-case.js";
import { InMemoryUserRepository } from "../../../../src/contexts/auth/infrastructure/repositories/in-memory-user.repository.js";

describe("RegisterUserUseCase", () => {
  let useCase: RegisterUserUseCase;
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    useCase = new RegisterUserUseCase(repository);
  });

  it("registers a user with valid data", async () => {
    const result = await useCase.execute({
      email: "nuevo@example.com",
      password: "password123",
      name: "Juan Pérez",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.message).toBe("Usuario registrado exitosamente");
      expect(result.user.email).toBe("nuevo@example.com");
      expect(result.user.name).toBe("Juan Pérez");
      expect(result.user.id).toBeDefined();
    }

    const found = await repository.findByEmail("nuevo@example.com");
    expect(found).not.toBeNull();
    expect(found?.passwordHash).not.toBe("password123");
    expect(found?.email).toBe("nuevo@example.com");
  });

  it("returns 409 when email already exists", async () => {
    await useCase.execute({
      email: "existente@example.com",
      password: "password123",
      name: "Juan Pérez",
    });

    const result = await useCase.execute({
      email: "existente@example.com",
      password: "otherpass456",
      name: "Otro Usuario",
    });

    expect(result.ok).toBe(false);
    if (!result.ok && result.status === 409) {
      expect(result.error).toBe("El email ya está registrado");
    }
  });

  it("returns 400 when email is invalid", async () => {
    const result = await useCase.execute({
      email: "invalid-email",
      password: "password123",
      name: "Juan Pérez",
    });

    expect(result.ok).toBe(false);
    if (!result.ok && result.status === 400) {
      expect(result.error).toBe("Datos inválidos");
      expect(result.details.length).toBeGreaterThan(0);
    }
  });

  it("returns 400 when password is too short", async () => {
    const result = await useCase.execute({
      email: "user@example.com",
      password: "short",
      name: "Juan Pérez",
    });

    expect(result.ok).toBe(false);
    if (!result.ok && result.status === 400) {
      expect(result.error).toBe("Datos inválidos");
      expect(result.details.some((d) => d.includes("8"))).toBe(true);
    }
  });

  it("returns 400 when name is too short", async () => {
    const result = await useCase.execute({
      email: "user@example.com",
      password: "password123",
      name: "J",
    });

    expect(result.ok).toBe(false);
    if (!result.ok && result.status === 400) {
      expect(result.error).toBe("Datos inválidos");
    }
  });

  it("stores email in lowercase", async () => {
    const result = await useCase.execute({
      email: "USER@Example.COM",
      password: "password123",
      name: "Juan Pérez",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.user.email).toBe("user@example.com");
    }
  });
});
