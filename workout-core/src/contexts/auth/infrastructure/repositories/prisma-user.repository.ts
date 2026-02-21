import { PrismaClient } from "@prisma/client";
import type { User } from "../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../domain/repositories/user.repository.js";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase();
    const row = await this.prisma.user.findFirst({
      where: { email: normalized },
    });
    if (!row) return null;
    return this.toDomain(row);
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const normalized = {
      ...user,
      email: user.email.trim().toLowerCase(),
    };
    const row = await this.prisma.user.create({
      data: {
        email: normalized.email,
        name: normalized.name,
        passwordHash: normalized.passwordHash,
      },
    });
    return this.toDomain(row);
  }

  private toDomain(row: {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
  }): User {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      passwordHash: row.passwordHash,
    };
  }
}
