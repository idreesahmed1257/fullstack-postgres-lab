import apiInterceptor from "./ApiInterceptor";

export const sendCreditsService = async (amount: number, recipientEmail: string) => {
  try {
    return await apiInterceptor.post("/credits/", { amount, recipientEmail });
  } catch (err) {
    throw err;
  }
};

export const getSentCreditsService = async () => {
  try {
    return await apiInterceptor.get(`/credits/sent`);
  } catch (err) {
    throw err;
  }
};

export const getReceivedCreditsService = async () => {
  try {
    return await apiInterceptor.get(`/credits/received`);
  } catch (err) {
    throw err;
  }
};
