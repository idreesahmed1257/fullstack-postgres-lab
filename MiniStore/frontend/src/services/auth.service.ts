import apiInterceptor from "./ApiInterceptor";
import { authClient } from "./auth-client";

export const loginService = async (email: string, password: string) => {
  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) throw error;

    return data;
  } catch (err) {
    throw err;
  }
};

export const signupService = async (name: string, email: string, password: string) => {
  try {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });
    if (error) throw error;

    return data;
  } catch (err) {
    throw err;
  }
};

export const logoutService = async () => {
  try {
    await authClient.signOut();
  } catch (err) {
    throw err;
  }
};

export const getUserService = async () => {
  try {
    const response = await apiInterceptor.get("/users/me");
    return response?.data;
  } catch (err) {
    console.log("err", err);
  }
};
