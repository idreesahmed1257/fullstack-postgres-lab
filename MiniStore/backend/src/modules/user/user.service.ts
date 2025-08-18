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

  async getSingleUser(userId: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
