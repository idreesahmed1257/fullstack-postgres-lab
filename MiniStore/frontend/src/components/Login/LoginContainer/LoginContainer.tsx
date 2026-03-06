import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../../services/auth.service";
import { useAuthStore } from "../../../stores";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginFormInputs, loginSchema } from "./login.helper";

const LoginContainer = () => {
  const navigate = useNavigate();
  const { loginSuccess } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await toast.promise(loginService(data.email, data.password), {
        loading: "Logging in...",
        success: "Login successful!",
        error: "Login failed.",
      });

      const { user, token } = response;

      if (token) {
        loginSuccess(user, token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-bgmain flex justify-center items-center p-5">
      <div className="bg-bgpaper px-8 py-10 rounded-xl shadow-giftly w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-primary mb-3">Welcome Back</h1>
        <p className="text-textdark mb-8 text-base">Please login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 text-left">
            <label htmlFor="email" className="block mb-1.5 text-textdark font-semibold text-sm">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 border-2 border-primary rounded-lg text-base outline-none text-textdark bg-white transition-colors focus:border-secondary"
              {...register("email")}
            />
            {errors.email && <p className="text-[#d32f2f] text-sm mt-1 font-semibold">{errors.email.message}</p>}
          </div>

          <div className="mb-5 text-left relative">
            <label htmlFor="password" className="block mb-1.5 text-textdark font-semibold text-sm">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-3.5 py-2.5 border-2 border-primary rounded-lg text-base outline-none text-textdark bg-white transition-colors focus:border-secondary pr-10"
              {...register("password")}
            />
            {errors.password && <p className="text-[#d32f2f] text-sm mt-1 font-semibold">{errors.password.message}</p>}

            <div
              onClick={toggleShowPassword}
              className="absolute right-2.5 top-[38px] cursor-pointer text-primary select-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleShowPassword();
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-bold text-lg transition-colors hover:from-secondary hover:to-primary disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-sm text-primary">
          New to Giftly? <span className="font-bold cursor-pointer" onClick={() => navigate("/signup")}>Create an Account</span>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
