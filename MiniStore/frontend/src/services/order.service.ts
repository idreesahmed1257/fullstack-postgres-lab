import apiInterceptor from "./ApiInterceptor";

export const createOrderService = async (productIds: number[], totalAmount: number) => {
  try {
    return await apiInterceptor.post("/orders/", { productIds, totalAmount });
  } catch (err) {
    throw err;
  }
};
export const getUserOrderService = async () => {
  try {
    return await apiInterceptor.get(`/orders/user`);
  } catch (err) {
    throw err;
  }
};
