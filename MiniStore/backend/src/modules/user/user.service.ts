import { PrismaClient } from "@prisma/client";
// import { User } from "./user.model";

import { User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  async getUsers(name: string): Promise<User[]> {
    return await prisma.user.findMany({
      where: { name },
    });
  }

  async registerUser(input: { name: string; email: string; password: string }): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });
      return newUser as User;
    } catch (err: any) {
      // Prisma uses 'P2002' for unique constraint violation (similar to 23505 in Postgres)
      if (err.code === "P2002" && err.meta?.target?.includes("email")) {
        throw new Error("Email already registered");
      }
      throw err;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
