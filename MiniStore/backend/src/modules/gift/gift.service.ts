import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GiftService {
  async sendGift(senderId: number, recipientEmail: string, productIds: number[], totalAmount: number) {
    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      throw new Error("Total amount must be a positive number");
    }

    if (!productIds?.length) {
      throw new Error("You must select products to gift");
    }

    return await prisma.$transaction(async (tx) => {
      // 1. Find recipient by email
      const recipient = await tx.user.findUnique({ where: { email: recipientEmail } });
      if (!recipient) throw new Error("Recipient not found");
      if (recipient.id === senderId) throw new Error("Cannot gift to yourself");

      // 2. Check sender's wallet balance
      const sender = await tx.user.findUnique({ where: { id: senderId } });
      if (!sender) throw new Error("Sender not found");
      if (sender.walletBalance < totalAmount) throw new Error("Insufficient wallet balance");

      // 3. Deduct from sender's wallet
      await tx.user.update({
        where: { id: senderId },
        data: { walletBalance: { decrement: totalAmount } },
      });

      // 4. Create gift record

      const order = await tx.order.create({
        data: {
          userId: senderId,
          productIds,
          total_amount: totalAmount,
        },
      });
      
      const gift = await tx.gift.create({
        data: {
          senderId,
          recipientId: recipient.id,
          productIds,
          totalAmount,
        },
        include: {
          sender: { select: { id: true, name: true, email: true } },
          recipient: { select: { id: true, name: true, email: true } },
        },
      });

      return gift;
    });
  }

  async getGiftsSent(userId: number) {
    return prisma.gift.findMany({
      where: { senderId: userId },
      orderBy: { giftedAt: "desc" },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        recipient: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async getGiftsReceived(userId: number) {
    return prisma.gift.findMany({
      where: { recipientId: userId },
      orderBy: { giftedAt: "desc" },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        recipient: { select: { id: true, name: true, email: true } },
      },
    });
  }
}
