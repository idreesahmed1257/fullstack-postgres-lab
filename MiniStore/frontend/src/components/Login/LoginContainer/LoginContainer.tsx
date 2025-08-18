import { Visibility, VisibilityOff } from "@mui/icons-material";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../Redux/slice/auth.slice";
import { AppDispatch } from "../../../Redux/store";
import { loginService } from "../../../services/auth.service";
import styles from "./loginContainer.module.scss";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormInputs, loginSchema } from "./login.helper";

const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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
        dispatch(loginSuccess({ user, token }));
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
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Please login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email Address
            </label>
            <input id="email" type="email" placeholder="you@example.com" className={styles.inputField} {...register("email")} />
            {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
          </div>

          <div className={styles.inputGroup} style={{ position: "relative" }}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className={styles.inputField} style={{ paddingRight: "40px" }} {...register("password")} />
            {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
            <div
              onClick={toggleShowPassword}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                color: "#994D80",
                userSelect: "none",
              }}
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

          <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className={styles.alreadyAccount}>
          New to Giftly? <span onClick={() => navigate("/signup")}>Create an Account</span>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
