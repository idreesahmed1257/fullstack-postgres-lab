import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CreditService {
  async sendCredits(senderId: number, recipientEmail: string, amount: number) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }

    return await prisma.$transaction(async (tx) => {
      // 1. Find recipient by email
      const recipient = await tx.user.findUnique({ where: { email: recipientEmail } });
      if (!recipient) throw new Error("Recipient not found");
      if (recipient.id === senderId) throw new Error("Cannot send credits to yourself");

      // 2. Check sender's wallet balance
      const sender = await tx.user.findUnique({ where: { id: senderId } });
      if (!sender) throw new Error("Sender not found");
      if (sender.walletBalance < amount) throw new Error("Insufficient wallet balance");

      // 3. Deduct from sender's wallet
      await tx.user.update({
        where: { id: senderId },
        data: { walletBalance: { decrement: amount } },
      });

      // 4. Add to recipient's wallet
      await tx.user.update({
        where: { id: recipient.id },
        data: { walletBalance: { increment: amount } },
      });

      // 5. Create credit transfer record
      const creditTransfer = await tx.creditTransfer.create({
        data: {
          senderId,
          recipientId: recipient.id,
          amount,
        },
        include: {
          sender: { select: { id: true, name: true, email: true } },
          recipient: { select: { id: true, name: true, email: true } },
        },
      });

      return creditTransfer;
    });
  }

  async getCreditsSent(userId: number) {
    return prisma.creditTransfer.findMany({
      where: { senderId: userId },
      orderBy: { createdAt: "desc" },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        recipient: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async getCreditsReceived(userId: number) {
    return prisma.creditTransfer.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        recipient: { select: { id: true, name: true, email: true } },
      },
    });
  }
}
