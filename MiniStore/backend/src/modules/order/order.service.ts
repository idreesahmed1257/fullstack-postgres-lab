import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export class OrderService {
  async createOrder(userId: number, productIds: number[], totalAmount: number) {
    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      throw new Error("Insufficient wallet balance");
    }

    if (!productIds?.length) {
      throw new Error("You must select product to create order");
    }
    return await prisma.$transaction(async (tx) => {
      // 1. Deduct wallet balance
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("User not found");
      if (user.walletBalance < totalAmount) throw new Error("Insufficient wallet balance");
      await tx.user.update({
        where: { id: userId },
        data: { walletBalance: { decrement: totalAmount } },
      });
      const order = await tx.order.create({
        data: {
          userId,
          productIds,
          total_amount: totalAmount,
        },
      });
      return order;
    });
  }

  async getOrdersByUser(userId: number) {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { created_at: "desc" },
    });

    return orders;
  }
}
