import { randomUUID } from "node:crypto";
import type { User } from "../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../domain/repositories/user.repository.js";

export class InMemoryUserRepository implements IUserRepository {
  private users = new Map<string, User>();

  async findByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase();
    for (const user of this.users.values()) {
      if (user.email === normalized) return user;
    }
    return null;
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const id = randomUUID();
    const created: User = { ...user, id };
    this.users.set(id, created);
    return created;
  }
}
