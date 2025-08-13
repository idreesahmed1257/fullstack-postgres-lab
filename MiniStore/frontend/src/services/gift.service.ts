import apiInterceptor from "./ApiInterceptor";

export const sendGiftService = async (productIds: number[], totalAmount: number, recipientEmail: string) => {
  try {
    return await apiInterceptor.post("/gifts/", { productIds, totalAmount, recipientEmail });
  } catch (err) {
    throw err;
  }
};

export const getSentGiftsService = async () => {
  try {
    return await apiInterceptor.get(`/gifts/sent`);
  } catch (err) {
    throw err;
  }
};

export const getReceivedGiftsService = async () => {
  try {
    return await apiInterceptor.get(`/gifts/received`);
  } catch (err) {
    throw err;
  }
};
