import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserService, loginService, signupService, logoutService } from "../services/auth.service";
import { createOrderService } from "../services/order.service";
import { sendGiftService } from "../services/gift.service";
import { sendCreditsService } from "../services/credit.service";
import { queryKeys } from "../services/queryKeys";

export const useUserQuery = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: async () => {
      const res = await getUserService();
      return res?.data ?? null;
    },
    staleTime: 60_000,
  });
};

export const useCreateOrderMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { productIds: number[]; totalAmount: number }) => {
      return createOrderService(payload.productIds, payload.totalAmount);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders });
    },
  });
};

export const useSendGiftMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { productIds: number[]; totalAmount: number; recipientEmail: string }) => {
      return sendGiftService(payload.productIds, payload.totalAmount, payload.recipientEmail);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.gifts.sent });
      qc.invalidateQueries({ queryKey: queryKeys.gifts.received });
    },
  });
};

export const useSendCreditsMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { amount: number; email: string }) => {
      return sendCreditsService(payload.amount, payload.email);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.credits.sent });
      qc.invalidateQueries({ queryKey: queryKeys.credits.received });
      qc.invalidateQueries({ queryKey: queryKeys.user });
    },
  });
};


export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => loginService(payload.email, payload.password),
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (payload: { name: string; email: string; password: string }) => signupService(payload.name, payload.email, payload.password),
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => logoutService(),
  });
};
