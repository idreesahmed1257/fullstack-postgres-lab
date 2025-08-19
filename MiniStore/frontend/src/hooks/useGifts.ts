import { useQuery } from "@tanstack/react-query";
import { getReceivedGiftsService, getSentGiftsService } from "../services/gift.service";
import { queryKeys } from "../services/queryKeys";

export const useSentGiftsQuery = () => {
  return useQuery({
    queryKey: queryKeys.gifts.sent,
    queryFn: async () => {
      const res = await getSentGiftsService();
      return res?.data?.data ?? [];
    },
    staleTime: 60_000,
  });
};

export const useReceivedGiftsQuery = () => {
  return useQuery({
    queryKey: queryKeys.gifts.received,
    queryFn: async () => {
      const res = await getReceivedGiftsService();
      return res?.data?.data ?? [];
    },
    staleTime: 60_000,
  });
};
