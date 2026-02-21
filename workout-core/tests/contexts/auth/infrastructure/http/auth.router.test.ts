import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../../../../src/app.js";

describe("POST /api/v1/auth/register", () => {
  it("returns 200 with message and user on valid registration", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        email: "nuevo@example.com",
        password: "password123",
        name: "Juan Pérez",
      })
      .expect(200);

    expect(res.body).toHaveProperty("message", "Usuario registrado exitosamente");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toMatchObject({
      email: "nuevo@example.com",
      name: "Juan Pérez",
    });
    expect(res.body.user).toHaveProperty("id");
  });

  it("returns 409 when email already registered", async () => {
    await request(app)
      .post("/api/v1/auth/register")
      .send({
        email: "dup@example.com",
        password: "password123",
        name: "First User",
      })
      .expect(200);

    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        email: "dup@example.com",
        password: "other456",
        name: "Second User",
      })
      .expect(409);

    expect(res.body).toEqual({ error: "El email ya está registrado" });
  });

  it("returns 400 with details for invalid email", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        email: "invalid-email",
        password: "password123",
        name: "Juan Pérez",
      })
      .expect(400);

    expect(res.body).toHaveProperty("error", "Datos inválidos");
    expect(res.body).toHaveProperty("details");
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it("returns 400 for short password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        email: "user@example.com",
        password: "short",
        name: "Juan Pérez",
      })
      .expect(400);

    expect(res.body.error).toBe("Datos inválidos");
  });
});
