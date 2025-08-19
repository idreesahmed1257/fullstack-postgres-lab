import { useQuery } from "@tanstack/react-query";
import { getReceivedCreditsService, getSentCreditsService } from "../services/credit.service";
import { queryKeys } from "../services/queryKeys";

export const useSentCreditsQuery = () => {
  return useQuery({
    queryKey: queryKeys.credits.sent,
    queryFn: async () => {
      const res = await getSentCreditsService();
      return res?.data?.data ?? [];
    },
    staleTime: 60_000,
  });
};

export const useReceivedCreditsQuery = () => {
  return useQuery({
    queryKey: queryKeys.credits.received,
    queryFn: async () => {
      const res = await getReceivedCreditsService();
      return res?.data?.data ?? [];
    },
    staleTime: 60_000,
  });
};
