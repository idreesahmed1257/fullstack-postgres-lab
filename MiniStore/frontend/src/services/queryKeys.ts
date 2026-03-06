export const queryKeys = {
  user: ["user"] as const,
  orders: ["orders"] as const,
  gifts: {
    sent: ["gifts", "sent"] as const,
    received: ["gifts", "received"] as const,
  },
  credits: {
    sent: ["credits", "sent"] as const,
    received: ["credits", "received"] as const,
  },
};
