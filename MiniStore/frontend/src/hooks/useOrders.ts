import { useQuery } from "@tanstack/react-query";
import { getUserOrderService } from "../services/order.service";
import { queryKeys } from "../services/queryKeys";

export const useUserOrdersQuery = () => {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: async () => {
      const res = await getUserOrderService();
      return res?.data?.data ?? [];
    },
    staleTime: 60_000,
  });
};
