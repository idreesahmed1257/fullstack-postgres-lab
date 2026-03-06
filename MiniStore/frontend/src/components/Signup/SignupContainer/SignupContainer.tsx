import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../../services/auth.service";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupFormInputs, signupSchema } from "./signup.helper";

const SignupContainer = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await toast.promise(signupService(data.name, data.email, data.password), {
        loading: "Signing up...",
        success: "Signup successful!",
        error: "Signup failed.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-bgmain">
      <div className="w-full max-w-md px-8 py-10 text-center bg-bgpaper rounded-xl shadow-giftly">
        <h1 className="mb-3 text-2xl font-bold text-primary">Create an Account</h1>
        <p className="mb-8 text-base text-textdark">Sign up to get started</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 text-left">
            <label htmlFor="name" className="block mb-1.5 text-textdark font-semibold text-sm">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full px-3.5 py-2.5 border-2 border-primary rounded-lg text-base outline-none text-textdark bg-white transition-colors focus:border-secondary"
              {...register("name")}
            />
            {errors.name && <p className="text-[#d32f2f] text-sm mt-1 font-semibold">{errors.name.message}</p>}
          </div>

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

          <div className="relative mb-5 text-left">
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

          <div className="relative mb-5 text-left">
            <label htmlFor="confirmPassword" className="block mb-1.5 text-textdark font-semibold text-sm">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="w-full px-3.5 py-2.5 border-2 border-primary rounded-lg text-base outline-none text-textdark bg-white transition-colors focus:border-secondary pr-10"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-[#d32f2f] text-sm mt-1 font-semibold">{errors.confirmPassword.message}</p>}

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
            className="w-full py-3 text-lg font-bold text-white transition-colors rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-sm text-primary">
          Already have an account?{" "}
          <span className="font-bold cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupContainer;
