import apiInterceptor from "./ApiInterceptor";

export const loginService = async (email: string, password: string) => {
  try {
    return await apiInterceptor.post("/users/login", { email, password });
  } catch (err) {
    throw err;
  }
};

export const signupService = async (name: string, email: string, password: string) => {
  try {
    return await apiInterceptor.post("/users/register", { name, email, password });
  } catch (err) {
    throw err;
  }
};
