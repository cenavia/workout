import { PrismaClient } from "@prisma/client";
import type { IUserRepository } from "../domain/repositories/user.repository.js";
import { InMemoryUserRepository } from "./repositories/in-memory-user.repository.js";
import { PrismaUserRepository } from "./repositories/prisma-user.repository.js";

export function createUserRepository(): IUserRepository {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    const prisma = new PrismaClient();
    return new PrismaUserRepository(prisma);
  }
  return new InMemoryUserRepository();
}
